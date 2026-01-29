# BCPrimeON - Digital Accounting Platform

## Overview

BCPrimeON is a digital accounting services website for a Brazilian accounting firm. The platform provides information about accounting services, financial consulting, tax planning, and company formation. It includes a public-facing marketing site, a blog system, lead capture forms, and an admin dashboard for content management.

## Contact Information

- **Telefone**: (41) 3403-2089
- **WhatsApp**: (41) 9 8511-7177
- **Email**: sales@bcprimeon.com
- **Endereço**: Av. Camilo di Lellis, nº 633, Salas 45 e 47 - Pinhais - PR

## Business Details

- **Pricing plans**: Exclusive for Simples Nacional companies
- **Admin credentials**: username "admin", password "bcprime2024" (localStorage-based auth)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with HMR support

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with tsx for development
- **API Pattern**: RESTful JSON APIs under `/api/*` prefix
- **Architecture Pattern**: Three-layer separation (routes → storage → database)

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Drizzle Kit with `db:push` command

### Key Data Models
- **Users**: Authentication for admin access
- **Leads**: Contact form submissions with name, email, phone, company, subject, message
- **BlogPosts**: Content with title, slug, excerpt, content, category, SEO metadata
- **SEOKeywords**: Keyword tracking for SEO purposes

### Build and Deployment
- **Development**: `npm run dev` runs tsx with Vite middleware
- **Production Build**: Custom esbuild script bundles server, Vite builds client to `dist/public`
- **Static Serving**: Express serves built client files in production

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- `pg` driver with `drizzle-orm` for queries
- `connect-pg-simple` for session storage capability

### UI/Component Libraries
- Full shadcn/ui component set (40+ Radix UI-based components)
- Lucide React for icons
- React Icons for brand icons (WhatsApp, Instagram, LinkedIn, etc.)
- Embla Carousel for carousels
- Recharts for charts
- CMDK for command palette
- Vaul for drawer components

### Form and Validation
- React Hook Form for form state management
- Zod for runtime validation
- `@hookform/resolvers` for Zod integration
- `drizzle-zod` for generating Zod schemas from Drizzle tables

### Development Tools
- Replit-specific Vite plugins for error overlay, cartographer, and dev banner
- TypeScript with strict mode enabled