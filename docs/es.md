# Prisma Template CLI (ES)

> Esta es la versión traducida. La documentación canónica por defecto está en [docs/en.md](docs/en.md).

Genera un `schema.prisma` profesional combinando módulos tipo LEGO, seleccionando la base de datos destino y navegando por categorías.

## ¿Qué hace?

- Descubre automáticamente todas las plantillas en `templates/<categoría>/<nombre>.prisma`.
- Permite elegir proveedor de base de datos (`postgresql`, `mysql`, `sqlserver`, `sqlite`, `mongodb`, `cockroachdb`).
- Fusiona múltiples módulos (core, business, commerce, etc.) en un único `schema.prisma` listo para Prisma Client.
- Incluye un asistente interactivo con navegación por categorías para seleccionar plantillas sin memorizar nombres.
- Soporta uso directo por CLI (`--add auth billing ott`) y rutas personalizadas (`--output`).

## Uso rápido

```bash
# Modo interactivo
npx prisma-template

# Ejemplo directo por CLI
npx prisma-template --db mysql --add auth billing ott --output ./prisma/schema.prisma
```

### Flujo interactivo

1. Selecciona el proveedor de base de datos.
2. Decide si quieres usar una **Template** (estructura completa) o el modo **Custom**.
3. Las Templates te dejan elegir entre stacks curados (OTT Platform, B2B SaaS Suite, Marketplace Hub, etc.) y luego ajustarlos; el modo Custom abre el navegador por categorías para activar los módulos que necesites.
4. Finaliza cuando tengas todos los esquemas requeridos; el CLI validará que exista al menos uno.

## Plantillas predefinidas

| Template         | Resumen                                                                               | Módulos clave                                                                                                                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OTT Platform     | Catálogo OTT punta a punta con playlists, progress, entitlements, anuncios y billing. | `core/auth`, `core/rbac`, `core/saas-multitenant`, todo `streaming/ott-*`, `commerce/billing-subscriptions`, `commerce/payments`, `commerce/invoicing`, `infra/api-keys`, `infra/webhooks`                                                                        |
| B2B SaaS Suite   | Organizaciones, proyectos, tareas, suscripciones, facturación y notificaciones.       | `core/auth`, `core/feature-flags`, `business/organizations`, `business/projects`, `business/tasks`, `commerce/billing-subscriptions`, `commerce/invoicing`, `engagement/notifications`, `infra/webhooks`                                                          |
| Content Network  | CMS multi-superficie con interacción social, reacciones y moderación.                 | `core/auth`, `content/cms-content`, `content/blog`, `content/documentation`, `content/knowledge-base`, `engagement/comments`, `engagement/reactions`, `engagement/moderation`, `engagement/notifications`, `infra/webhooks`                                       |
| Marketplace Hub  | Marketplace multi-vendedor con catálogo, pedidos, créditos y pagos.                   | `core/auth`, `core/rbac`, `commerce/marketplace`, `commerce/ecommerce`, `commerce/payments`, `commerce/billing-subscriptions`, `commerce/credits-usage`, `commerce/invoicing`, `infra/api-keys`, `infra/rate-limit`, `infra/webhooks`                             |
| Creator Economy  | Contenido premium, membresías y payouts a creadores con comunidad.                    | `core/auth`, `core/rbac`, `content/blog`, `content/media-library`, `content/cms-content`, `commerce/billing-subscriptions`, `commerce/payments`, `engagement/social`, `engagement/comments`, `engagement/reactions`, `engagement/notifications`, `infra/webhooks` |
| Knowledge Hub    | Documentación, base de conocimiento, LMS y analytics de engagement.                   | `core/auth`, `core/rbac`, `content/documentation`, `content/knowledge-base`, `content/lms-elearning`, `content/cms-content`, `engagement/comments`, `engagement/reactions`, `engagement/analytics-events`, `infra/webhooks`                                       |
| Support Ops      | Mesa de ayuda con CRM, auditoría y alertas.                                           | `core/auth`, `core/rbac`, `core/identity`, `core/audit-log`, `business/crm`, `business/organizations`, `business/tasks`, `operations/support-ticketing`, `engagement/notifications`                                                                               |
| Booking Platform | Reservas, disponibilidad y cobros recurrentes.                                        | `core/auth`, `core/rbac`, `business/organizations`, `business/projects`, `operations/booking`, `commerce/payments`, `commerce/billing-subscriptions`, `engagement/notifications`, `infra/webhooks`                                                                |
| IoT Fleet        | Gestión de dispositivos IoT, telemetría y alertas.                                    | `core/auth`, `core/rbac`, `core/audit-log`, `infra/devices-iot`, `infra/telemetry`, `infra/api-keys`, `infra/rate-limit`, `infra/webhooks`, `engagement/notifications`                                                                                            |
| Social Community | Comunidad social con grafo, reacciones, moderación y experimentación.                 | `core/auth`, `core/identity`, `engagement/social`, `engagement/comments`, `engagement/reactions`, `engagement/moderation`, `engagement/notifications`, `engagement/ab-testing`                                                                                    |
| Education LMS    | Plataforma educativa con cursos, media y comunidad.                                   | `core/auth`, `core/rbac`, `content/lms-elearning`, `content/cms-content`, `content/media-library`, `streaming/ott-progress`, `engagement/comments`, `engagement/reactions`, `engagement/notifications`, `infra/webhooks`                                          |

Al elegir una template puedes aceptarla tal cual o abrir el navegador por categorías para sumar o quitar módulos antes de generar el `schema.prisma`.

## Opciones

| Flag                       | Descripción                                                                    |
| -------------------------- | ------------------------------------------------------------------------------ |
| `-d, --db <provider>`      | Define el proveedor de base de datos (si no, se pregunta en modo interactivo). |
| `-a, --add <templates...>` | Lista de módulos a incluir; acepta alias, prefijos o categorías completas.     |
| `-o, --output <path>`      | Ruta donde guardar el `schema.prisma` generado (por defecto `schema.prisma`).  |

> Nota: `--add` soporta distintos formatos: `--add auth business/projects ott`, `--add business`, `--add core:identity`. Los nombres se resuelven automáticamente contra las plantillas disponibles.

## Organización de plantillas

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

- Cada archivo `.prisma` dentro de la jerarquía se detecta automáticamente.
- Los módulos usan el patrón `<categoría>/<archivo>` (ej. `business/organizations`).
- Puedes crear nuevas categorías; el CLI las encontrará sin configuración extra.

## Resultado

- El CLI genera un `schema.prisma` con:
  - Bloque `generator client` y `datasource db` configurados con el proveedor elegido.
  - Contenido de cada plantilla precedido por `// ==== category/name ====` para identificar el origen.
- Ideal para arrancar proyectos Prisma, ejecutar migraciones o extender manualmente.

## Desarrollo

```bash
npm install
npm run build
```

¡Listo! Usa esta biblioteca para armar esquemas reusables y eficientes para tus proyectos Prisma.
