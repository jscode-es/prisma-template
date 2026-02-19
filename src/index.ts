#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import {
  DATABASE_PROVIDERS,
  DatabaseProvider,
  TEMPLATE_PRESETS,
  TemplateModule,
  getAvailableTemplates,
  isSupportedProvider,
  resolveTemplateTokens,
  writeSchemaFile,
} from "./templates";

const program = new Command();

program
  .name("prisma-template")
  .description(
    "Genera un schema.prisma combinando plantillas modulares y seleccionando la base de datos objetivo.",
  )
  .option(
    "-d, --db <provider>",
    `Proveedor de base de datos (${DATABASE_PROVIDERS.join(", ")})`,
  )
  .option(
    "-a, --add <templates...>",
    "Módulos a incluir (ej: auth billing ott)",
  )
  .option(
    "-o, --output <output>",
    "Ruta donde guardar el schema final",
    "schema.prisma",
  )
  .action(async (options) => {
    const availableTemplates = getAvailableTemplates();
    if (!availableTemplates.length) {
      console.log(
        chalk.red("No se encontraron plantillas en la carpeta templates/."),
      );
      return;
    }

    const dbProvider = await chooseDatabaseProvider(options.db);
    const cliTemplates = normalizeTemplateArgs(options.add);
    const selectedModules = await chooseModules(
      cliTemplates,
      availableTemplates,
    );

    writeSchemaFile(dbProvider, selectedModules, options.output);
  });

program.parseAsync(process.argv).catch((error) => {
  console.error(chalk.red((error as Error).message));
  process.exit(1);
});

async function chooseDatabaseProvider(
  provided?: string,
): Promise<DatabaseProvider> {
  if (provided) {
    if (isSupportedProvider(provided)) {
      return provided;
    }
    console.log(
      chalk.yellow(
        `Proveedor desconocido "${provided}". Selecciona uno de: ${DATABASE_PROVIDERS.join(", ")}.`,
      ),
    );
  }

  const { provider } = await inquirer.prompt([
    {
      type: "list",
      name: "provider",
      message: "Selecciona el tipo de base de datos",
      choices: DATABASE_PROVIDERS,
      default: "postgresql",
    },
  ]);

  return provider;
}

async function chooseModules(
  provided: string[] | undefined,
  templates: TemplateModule[],
): Promise<TemplateModule[]> {
  if (provided?.length) {
    try {
      return resolveTemplateTokens(provided, templates);
    } catch (error) {
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  }

  if (!TEMPLATE_PRESETS.length) {
    return selectModulesInteractively(templates);
  }

  return selectModeAndModules(templates);
}

function normalizeTemplateArgs(input?: string[]): string[] | undefined {
  if (!input?.length) return undefined;
  const values = input.flatMap((value) => value.split(","));
  return values.map((value) => value.trim()).filter(Boolean);
}

async function selectModeAndModules(
  templates: TemplateModule[],
): Promise<TemplateModule[]> {
  const { mode } = await inquirer.prompt([
    {
      type: "list",
      name: "mode",
      message: "¿Cómo quieres armar tu schema?",
      choices: [
        {
          name: "Template (estructuras completas predefinidas)",
          value: "preset",
        },
        {
          name: "Custom (seleccionar módulos manualmente)",
          value: "custom",
        },
      ],
      default: "preset",
    },
  ]);

  if (mode === "preset") {
    return selectTemplatePreset(templates);
  }

  return selectModulesInteractively(templates);
}

async function selectTemplatePreset(
  templates: TemplateModule[],
): Promise<TemplateModule[]> {
  const choices = TEMPLATE_PRESETS.map((preset) => ({
    name: `${preset.label} — ${preset.summary}`,
    value: preset.id,
  }));

  const { presetId } = await inquirer.prompt([
    {
      type: "list",
      name: "presetId",
      message: "Selecciona una plantilla completa",
      choices,
      pageSize: Math.min(choices.length, 10),
    },
  ]);

  const preset = TEMPLATE_PRESETS.find((item) => item.id === presetId)!;

  let resolved: TemplateModule[];
  try {
    resolved = resolveTemplateTokens(preset.modules, templates);
  } catch (error) {
    console.log(chalk.red((error as Error).message));
    return selectModulesInteractively(templates);
  }

  console.log(chalk.cyan(`\nPlantilla "${preset.label}" incluye:`));
  resolved.forEach((tpl) => console.log(`  · ${tpl.label}`));

  const { extend } = await inquirer.prompt([
    {
      type: "confirm",
      name: "extend",
      message: "¿Quieres agregar o quitar módulos?",
      default: false,
    },
  ]);

  if (extend) {
    return selectModulesInteractively(templates, resolved);
  }

  return resolved;
}

async function selectModulesInteractively(
  templates: TemplateModule[],
  initialSelection?: TemplateModule[],
): Promise<TemplateModule[]> {
  const categories = Array.from(
    new Set(templates.map((tpl) => tpl.category)),
  ).sort();
  const selection = new Set<string>(
    initialSelection?.map((tpl) => tpl.label) ?? [],
  );
  const doneValue = "__done";

  while (true) {
    const categoryChoices = categories.map((category) => {
      const count = templates.filter(
        (tpl) => tpl.category === category && selection.has(tpl.label),
      ).length;
      const suffix = count ? ` (${count})` : "";
      return {
        name: `${category}${suffix}`,
        value: category,
      };
    });

    const fullCategoryChoices = [
      ...categoryChoices,
      new inquirer.Separator(),
      {
        name: selection.size
          ? `Finalizar selección (${selection.size} módulos)`
          : "Finalizar selección",
        value: doneValue,
      },
    ];

    const { category }: { category: string } = await inquirer.prompt([
      {
        type: "list",
        name: "category",
        message: "Navega por categorías y selecciona los módulos",
        choices: fullCategoryChoices,
        pageSize: Math.min(fullCategoryChoices.length, 15),
      },
    ]);

    if (category === doneValue) {
      if (!selection.size) {
        console.log(
          chalk.yellow(
            "Debes seleccionar al menos un módulo antes de continuar.",
          ),
        );
        continue;
      }
      break;
    }

    const categoryTemplates = templates.filter(
      (tpl) => tpl.category === category,
    );

    if (!categoryTemplates.length) {
      console.log(
        chalk.yellow("Esta categoría no tiene plantillas disponibles."),
      );
      continue;
    }

    const { modules }: { modules: string[] } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "modules",
        message: `Selecciona esquemas dentro de ${category}`,
        choices: categoryTemplates.map((tpl) => ({
          name: tpl.label,
          value: tpl.label,
          checked: selection.has(tpl.label),
        })),
        pageSize: Math.min(categoryTemplates.length + 2, 15),
      },
    ]);

    for (const tpl of categoryTemplates) {
      selection.delete(tpl.label);
    }
    for (const label of modules) {
      selection.add(label);
    }
  }

  return templates.filter((tpl) => selection.has(tpl.label));
}
