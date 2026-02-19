# Prisma Template CLI

> 🇬🇧 Merge modular Prisma templates to produce production-ready `schema.prisma` files. _(Default language: English)_
>
> 🇪🇸 Fusiona plantillas Prisma modulares para generar `schema.prisma` listos para producción. _(Traducción disponible)_

## 📚 Documentación / Documentation

- 🇬🇧 English (default): [docs/en.md](docs/en.md)
- 🇪🇸 Español (traducción): [docs/es.md](docs/es.md)

Cada guía cubre el flujo interactivo, las opciones y ejemplos detallados.

## 🧱 Categorías de plantillas / Template categories

| Category      | Quick summary (ES en paréntesis)                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `core/`       | Identity, auth, RBAC, multitenancy, auditing, feature flags _(Identidad, autenticación, RBAC, multitenancy, auditoría...)_  |
| `business/`   | Organizations, CRM, sales pipelines, projects, tasks _(Organizaciones, CRM, pipeline de ventas, proyectos y tareas)_        |
| `content/`    | CMS, blog, docs, knowledge base, LMS, media library _(CMS, blog, documentación, knowledge base, LMS y media library)_       |
| `commerce/`   | eCommerce, marketplace, payments, billing/subscriptions, invoicing, credits _(eCommerce, marketplace, pagos...)_            |
| `engagement/` | Social graph, comments, reactions, notifications, moderation, analytics, A/B testing _(Social, comentarios, reacciones...)_ |
| `operations/` | Booking engines and support/ticketing _(Booking y soporte/ticketing)_                                                       |
| `infra/`      | API keys, webhooks, rate limiting, IoT devices, telemetry _(API keys, webhooks, rate limiting, IoT, telemetry)_             |
| `streaming/`  | OTT catalog, playlists, progress, entitlements, ads _(OTT catalog, playlists, progress, entitlements y ads)_                |

Explora estas carpetas dentro de `templates/` para ver cada archivo `.prisma` disponible o crea los tuyos: el CLI los detectará automáticamente.

## 🚀 Quick peek

```bash
# Interactive wizard
npx prisma-template

# Direct CLI example
npx prisma-template --db mysql --add auth billing ott --output ./prisma/schema.prisma
```

Consulta la documentación localizada para conocer todas las capacidades y opciones avanzadas.

## 🧭 Template vs Custom

Tras elegir la base de datos puedes decidir entre:

- **Template**: estructuras completas ya curadas (10 stacks como `OTT Platform`, `B2B SaaS Suite`, `Marketplace Hub`, `Creator Economy`, `Knowledge Hub`, `Support Ops`, `Booking Platform`, `IoT Fleet`, `Social Community`, `Education LMS`) que combinan múltiples categorías y que luego puedes ajustar si lo necesitas.
- **Custom**: el flujo original donde navegas categoría por categoría y marcas los módulos que quieras combinar.

Los detalles de cada plantilla predefinida están descritos en la documentación (EN/ES). Usa el modo que mejor encaje con la velocidad que necesitas.
