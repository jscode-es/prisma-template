# Prisma Template CLI (EN)

> This is the canonical/default documentation. A Spanish translation is available in [docs/es.md](docs/es.md).

Generate production-ready `schema.prisma` files by mixing LEGO-style modules, choosing the target database, and browsing templates by category.

## What does it do?

- Automatically discovers every template under `templates/<category>/<name>.prisma`.
- Lets you pick the database provider (`postgresql`, `mysql`, `sqlserver`, `sqlite`, `mongodb`, `cockroachdb`).
- Merges multiple modules (core, business, commerce, etc.) into a single `schema.prisma` ready for Prisma Client.
- Provides an interactive wizard with category navigation so you can select modules without memorizing filenames.
- Supports direct CLI usage (`--add auth billing ott`) and custom destinations via `--output`.

## Quick start

```bash
# Interactive wizard
npx prisma-template

# Direct CLI example
npx prisma-template --db mysql --add auth billing ott --output ./prisma/schema.prisma
```

### Interactive flow

1. Choose the database provider.
2. Decide whether to use a **Template** (prebuilt structure) or **Custom** selection.
3. Templates let you pick from curated stacks (OTT Platform, B2B SaaS Suite, Marketplace Hub, etc.) and optionally extend them; Custom opens the category browser so you can toggle modules freely.
4. Finish once all required schemas are selected; the CLI enforces at least one module.

## Template presets

| Template         | Summary                                                                            | Key modules                                                                                                                                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OTT Platform     | End-to-end OTT catalog, playlists, entitlements, ads, billing, and access control. | `core/auth`, `core/rbac`, `core/saas-multitenant`, every `streaming/ott-*`, `commerce/billing-subscriptions`, `commerce/payments`, `commerce/invoicing`, `infra/api-keys`, `infra/webhooks`                                                                       |
| B2B SaaS Suite   | Organizations, projects, tasks, subscriptions, invoicing, and notifications.       | `core/auth`, `core/feature-flags`, `business/organizations`, `business/projects`, `business/tasks`, `commerce/billing-subscriptions`, `commerce/invoicing`, `engagement/notifications`, `infra/webhooks`                                                          |
| Content Network  | Multi-surface CMS plus social interactions, reactions, and moderation.             | `core/auth`, `content/cms-content`, `content/blog`, `content/documentation`, `content/knowledge-base`, `engagement/comments`, `engagement/reactions`, `engagement/moderation`, `engagement/notifications`, `infra/webhooks`                                       |
| Marketplace Hub  | Multi-vendor marketplace with catalog, orders, credits, and payments.              | `core/auth`, `core/rbac`, `commerce/marketplace`, `commerce/ecommerce`, `commerce/payments`, `commerce/billing-subscriptions`, `commerce/credits-usage`, `commerce/invoicing`, `infra/api-keys`, `infra/rate-limit`, `infra/webhooks`                             |
| Creator Economy  | Premium content, memberships, and community payouts.                               | `core/auth`, `core/rbac`, `content/blog`, `content/media-library`, `content/cms-content`, `commerce/billing-subscriptions`, `commerce/payments`, `engagement/social`, `engagement/comments`, `engagement/reactions`, `engagement/notifications`, `infra/webhooks` |
| Knowledge Hub    | Technical docs, knowledge base, LMS, and engagement analytics.                     | `core/auth`, `core/rbac`, `content/documentation`, `content/knowledge-base`, `content/lms-elearning`, `content/cms-content`, `engagement/comments`, `engagement/reactions`, `engagement/analytics-events`, `infra/webhooks`                                       |
| Support Ops      | Help desk with CRM context, audit trail, and alerts.                               | `core/auth`, `core/rbac`, `core/identity`, `core/audit-log`, `business/crm`, `business/organizations`, `business/tasks`, `operations/support-ticketing`, `engagement/notifications`                                                                               |
| Booking Platform | Scheduling, availability management, and payments.                                 | `core/auth`, `core/rbac`, `business/organizations`, `business/projects`, `operations/booking`, `commerce/payments`, `commerce/billing-subscriptions`, `engagement/notifications`, `infra/webhooks`                                                                |
| IoT Fleet        | IoT device onboarding, telemetry flows, and alerting.                              | `core/auth`, `core/rbac`, `core/audit-log`, `infra/devices-iot`, `infra/telemetry`, `infra/api-keys`, `infra/rate-limit`, `infra/webhooks`, `engagement/notifications`                                                                                            |
| Social Community | Social graph, comments, reactions, moderation, and experimentation.                | `core/auth`, `core/identity`, `engagement/social`, `engagement/comments`, `engagement/reactions`, `engagement/moderation`, `engagement/notifications`, `engagement/ab-testing`                                                                                    |
| Education LMS    | Courses, lessons, media streaming, and learner community.                          | `core/auth`, `core/rbac`, `content/lms-elearning`, `content/cms-content`, `content/media-library`, `streaming/ott-progress`, `engagement/comments`, `engagement/reactions`, `engagement/notifications`, `infra/webhooks`                                          |

When you pick a template you can immediately accept it or jump into the category browser to tweak modules before generating the final schema.

## Options

| Flag                       | Description                                                                       |
| -------------------------- | --------------------------------------------------------------------------------- |
| `-d, --db <provider>`      | Sets the database provider (prompted during interactive mode if omitted).         |
| `-a, --add <templates...>` | Modules to include; accepts aliases, prefixes, or entire categories.              |
| `-o, --output <path>`      | Destination path for the generated `schema.prisma` (defaults to `schema.prisma`). |

> Note: `--add` accepts multiple formats: `--add auth business/projects ott`, `--add business`, `--add core:identity`. Names are resolved automatically against the existing templates.

## Template structure

```
templates/
	core/
		auth.prisma
		identity.prisma
	business/
		organizations.prisma
		...
	...
```

- Any `.prisma` file inside the hierarchy is auto-discovered.
- Module names follow `<category>/<file>` (e.g. `business/organizations`).
- Add your own categories; the CLI will detect them without extra config.

## Output

- Generated `schema.prisma` includes:
  - `generator client` and `datasource db` blocks configured with the selected provider.
  - Each template’s content preceded by `// ==== category/name ====` for traceability.
- Perfect for bootstrapping Prisma projects, running migrations, or extending manually.

## Development

```bash
npm install
npm run build
```

That’s it! Use this toolkit to assemble reusable Prisma schemas tailored to your stack.
