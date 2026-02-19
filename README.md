# Prisma Template CLI

> 🇬🇧 Merge modular Prisma templates to produce production-ready `schema.prisma` files. _(Default language: English)_
>
> 🇪🇸 Traducción completa disponible en [docs/es.md](https://unpkg.com/prisma-template@latest/docs/es.md).

## 📚 Documentation

> Reading this on npm? Use the CDN links below because relative GitHub paths are not available here.

- 🇬🇧 English (canonical): [docs/en.md](https://unpkg.com/prisma-template@latest/docs/en.md)
- 🇪🇸 Spanish translation: [docs/es.md](https://unpkg.com/prisma-template@latest/docs/es.md)

Each guide covers the interactive flow, CLI flags, and detailed examples. Both files also ship inside the npm tarball under `docs/` if you prefer local reading.

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

Browse these folders under `templates/` to inspect every `.prisma` file or drop in new ones—the CLI picks them up automatically.

## 🚀 Quick peek

```bash
# Interactive wizard
npx prisma-template

# Direct CLI example
npx prisma-template --db mysql --add auth billing ott --output ./prisma/schema.prisma
```

## 📦 Install

```bash
# Global install
npm install -g prisma-template

# Or run ad-hoc without installing globally
npx prisma-template
```

## 🧭 Template vs Custom

After picking the database provider you can choose between:

- **Template**: ten curated stacks (e.g. `OTT Platform`, `B2B SaaS Suite`, `Marketplace Hub`, `Creator Economy`, `Knowledge Hub`, `Support Ops`, `Booking Platform`, `IoT Fleet`, `Social Community`, `Education LMS`) spanning multiple categories that you can accept or tweak.
- **Custom**: the original browser where you hop across categories and toggle exactly the modules you need.

Every preset is documented in detail (EN/ES). Pick whichever mode matches the speed you need.
