import chalk from "chalk";
import fs from "fs";
import path from "path";

const TEMPLATES_DIR = path.join(__dirname, "../templates");

export const DATABASE_PROVIDERS = [
  "postgresql",
  "mysql",
  "sqlserver",
  "sqlite",
  "mongodb",
  "cockroachdb",
] as const;

export type DatabaseProvider = (typeof DATABASE_PROVIDERS)[number];

export interface TemplateModule {
  id: string;
  category: string;
  label: string;
  filePath: string;
  aliases: string[];
}

export interface TemplatePreset {
  id: string;
  label: string;
  summary: string;
  modules: string[];
}

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: "ott-platform",
    label: "OTT Platform",
    summary: "Catálogo, playlists, tracking, monetización y permisos OTT",
    modules: [
      "core/auth",
      "core/rbac",
      "core/identity",
      "core/saas-multitenant",
      "core/audit-log",
      "streaming/ott-content",
      "streaming/ott-playlists",
      "streaming/ott-progress",
      "streaming/ott-entitlements",
      "streaming/ott-ads",
      "commerce/billing-subscriptions",
      "commerce/payments",
      "commerce/invoicing",
      "infra/api-keys",
      "infra/webhooks",
    ],
  },
  {
    id: "b2b-saas",
    label: "B2B SaaS Suite",
    summary: "Organizaciones, proyectos, tareas y monetización recurrente",
    modules: [
      "core/auth",
      "core/rbac",
      "core/saas-multitenant",
      "core/audit-log",
      "core/feature-flags",
      "business/organizations",
      "business/projects",
      "business/tasks",
      "commerce/billing-subscriptions",
      "commerce/invoicing",
      "commerce/payments",
      "infra/api-keys",
      "infra/webhooks",
      "engagement/notifications",
    ],
  },
  {
    id: "content-network",
    label: "Content Network",
    summary: "CMS completo con interacción social y moderación",
    modules: [
      "core/auth",
      "core/rbac",
      "core/identity",
      "content/cms-content",
      "content/blog",
      "content/documentation",
      "content/knowledge-base",
      "content/media-library",
      "engagement/comments",
      "engagement/reactions",
      "engagement/moderation",
      "engagement/notifications",
      "infra/webhooks",
    ],
  },
  {
    id: "marketplace-hub",
    label: "Marketplace Hub",
    summary: "Marketplace multi-vendedor con catálogo, pedidos y pagos",
    modules: [
      "core/auth",
      "core/rbac",
      "core/identity",
      "commerce/marketplace",
      "commerce/ecommerce",
      "commerce/payments",
      "commerce/billing-subscriptions",
      "commerce/invoicing",
      "commerce/credits-usage",
      "infra/api-keys",
      "infra/rate-limit",
      "infra/webhooks",
    ],
  },
  {
    id: "creator-economy",
    label: "Creator Economy",
    summary: "Contenido premium, comunidad y payouts a creadores",
    modules: [
      "core/auth",
      "core/rbac",
      "content/blog",
      "content/media-library",
      "content/cms-content",
      "commerce/billing-subscriptions",
      "commerce/payments",
      "engagement/social",
      "engagement/comments",
      "engagement/reactions",
      "engagement/notifications",
      "infra/webhooks",
    ],
  },
  {
    id: "knowledge-hub",
    label: "Knowledge Hub",
    summary: "Documentación, base de conocimiento y LMS",
    modules: [
      "core/auth",
      "core/rbac",
      "content/documentation",
      "content/knowledge-base",
      "content/lms-elearning",
      "content/cms-content",
      "engagement/comments",
      "engagement/reactions",
      "engagement/analytics-events",
      "infra/webhooks",
    ],
  },
  {
    id: "support-ops",
    label: "Support Ops",
    summary: "Mesa de ayuda con CRM, flujos y auditoría",
    modules: [
      "core/auth",
      "core/rbac",
      "core/identity",
      "core/audit-log",
      "business/crm",
      "business/organizations",
      "business/tasks",
      "operations/support-ticketing",
      "engagement/notifications",
    ],
  },
  {
    id: "booking-platform",
    label: "Booking Platform",
    summary: "Reservas, disponibilidad y cobros recurrentes",
    modules: [
      "core/auth",
      "core/rbac",
      "business/organizations",
      "business/projects",
      "operations/booking",
      "commerce/payments",
      "commerce/billing-subscriptions",
      "engagement/notifications",
      "infra/webhooks",
    ],
  },
  {
    id: "iot-fleet",
    label: "IoT Fleet",
    summary: "Gestión de dispositivos IoT, telemetría y alertas",
    modules: [
      "core/auth",
      "core/rbac",
      "core/audit-log",
      "infra/devices-iot",
      "infra/telemetry",
      "infra/api-keys",
      "infra/rate-limit",
      "infra/webhooks",
      "engagement/notifications",
    ],
  },
  {
    id: "social-community",
    label: "Social Community",
    summary: "Comunidad social con grafo, reacciones y moderación",
    modules: [
      "core/auth",
      "core/identity",
      "engagement/social",
      "engagement/comments",
      "engagement/reactions",
      "engagement/moderation",
      "engagement/notifications",
      "engagement/ab-testing",
    ],
  },
  {
    id: "education-lms",
    label: "Education LMS",
    summary: "Plataforma educativa con cursos, media y comunidad",
    modules: [
      "core/auth",
      "core/rbac",
      "content/lms-elearning",
      "content/cms-content",
      "content/media-library",
      "streaming/ott-progress",
      "engagement/comments",
      "engagement/reactions",
      "engagement/notifications",
      "infra/webhooks",
    ],
  },
];

export function isSupportedProvider(value: string): value is DatabaseProvider {
  return DATABASE_PROVIDERS.includes(value as DatabaseProvider);
}

export function getAvailableTemplates(): TemplateModule[] {
  if (!fs.existsSync(TEMPLATES_DIR)) return [];

  const entries = fs.readdirSync(TEMPLATES_DIR, { withFileTypes: true });
  const templates: TemplateModule[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const category = entry.name;
      const categoryDir = path.join(TEMPLATES_DIR, category);
      const files = fs.readdirSync(categoryDir);
      for (const file of files) {
        if (!file.endsWith(".prisma")) continue;
        const id = file.replace(/\.prisma$/, "");
        const label = `${category}/${id}`;
        templates.push({
          id,
          category,
          label,
          filePath: path.join(categoryDir, file),
          aliases: [
            id.toLowerCase(),
            label.toLowerCase(),
            `${category}:${id}`.toLowerCase(),
          ],
        });
      }
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".prisma")) continue;
    const id = entry.name.replace(/\.prisma$/, "");
    templates.push({
      id,
      category: "root",
      label: id,
      filePath: path.join(TEMPLATES_DIR, entry.name),
      aliases: [id.toLowerCase()],
    });
  }

  return templates.sort((a, b) => a.label.localeCompare(b.label));
}

export function resolveTemplateTokens(
  tokens: string[],
  templates: TemplateModule[],
): TemplateModule[] {
  const resolved: TemplateModule[] = [];

  for (const token of tokens) {
    const matches = matchToken(token, templates);
    if (!matches.length) {
      throw new Error(
        `No se encontró un template para "${token}". Usa el modo interactivo para ver opciones disponibles.`,
      );
    }

    for (const match of matches) {
      if (!resolved.some((tpl) => tpl.label === match.label)) {
        resolved.push(match);
      }
    }
  }

  return resolved;
}

function matchToken(token: string, templates: TemplateModule[]) {
  const normalized = token.toLowerCase();
  const exact = templates.find((tpl) => tpl.aliases.includes(normalized));
  if (exact) return [exact];

  const categoryMatches = templates.filter(
    (tpl) => tpl.category.toLowerCase() === normalized,
  );
  if (categoryMatches.length) return categoryMatches;

  const prefixMatches = templates.filter((tpl) =>
    tpl.id.toLowerCase().startsWith(normalized),
  );
  if (prefixMatches.length) return prefixMatches;

  return [];
}

export function composeSchemaFromTemplates(
  provider: DatabaseProvider,
  modules: TemplateModule[],
): string {
  if (!modules.length) {
    throw new Error(
      "Debes seleccionar al menos un módulo para generar el schema.",
    );
  }

  const generatorBlock = `generator client {\n  provider = "prisma-client-js"\n}`;
  const datasourceBlock = `datasource db {\n  provider = "${provider}"\n  url      = env("DATABASE_URL")\n}`;

  const moduleSections = modules.map((module) => {
    const raw = fs.readFileSync(module.filePath, "utf-8").trim();
    return [`// ==== ${module.label} ====`, raw].join("\n");
  });

  return (
    [generatorBlock, datasourceBlock, ...moduleSections].join("\n\n") + "\n"
  );
}

export function writeSchemaFile(
  provider: DatabaseProvider,
  modules: TemplateModule[],
  outputPath = "schema.prisma",
) {
  const schemaContent = composeSchemaFromTemplates(provider, modules);
  const schemaPath = path.isAbsolute(outputPath)
    ? outputPath
    : path.join(process.cwd(), outputPath);

  fs.mkdirSync(path.dirname(schemaPath), { recursive: true });
  fs.writeFileSync(schemaPath, schemaContent, "utf-8");

  const summary = modules.map((m) => m.label).join(", ");
  console.log(
    chalk.green(
      `\nSchema Prisma (${provider}) generado con: ${summary}\nGuardado en ${schemaPath}\n`,
    ),
  );
}
