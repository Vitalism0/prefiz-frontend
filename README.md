# PreFiz — Frontend

Frontend of the PreFiz educational platform. Built on **Next.js 16 App Router** with bilingual support (Polish / Ukrainian) and an admin panel for event management.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, CSS Modules |
| Language | TypeScript 5 |
| i18n | next-intl 4.8 (pl / uk) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Animations | Framer Motion |
| Carousel | Embla Carousel |
| HTTP Client | Fetch (centralized `lib/http.ts`) |
| Linter | ESLint (eslint-config-next) |

---

## Quick Start

### Prerequisites

- Node.js 20+
- Backend running at `http://localhost:5000` (or another URL defined in `.env.local`)

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Run in development mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production build

```bash
npm run build
npm run start
```

---

## Project Structure

```
prefiz-frontend/
├── app/
│   └── [locale]/               # Localized routes (pl / uk)
│       ├── (site)/             # Public site (with header)
│       │   ├── (with-footer)/  # Pages with footer (home)
│       │   ├── wydarzenia/[id] # Event details
│       │   ├── profile/        # User profile
│       │   └── [...slug]/      # "In development" — catch-all for unknown routes
│       ├── (auth)/             # Authentication (sign-in, sign-up, login)
│       └── (admin)/            # Admin panel (protected via Server Component)
│           └── admin/
│               ├── events/new  # Create event
│               └── registrations/ # Registrations list
├── components/
│   ├── Header/                 # Header with burger menu for mobile
│   ├── Footer/
│   ├── LanguageSwitch/
│   ├── Kalendarz/              # Events calendar
│   │   ├── EventCard/
│   │   ├── EventList/
│   │   └── RegisterModal/
│   └── home/                   # Home page sections
│       ├── HeroSection/
│       ├── OfferTilesSection/
│       ├── SpecialOfferSection/
│       └── ReviewsSection/
├── lib/
│   ├── http.ts                 # Centralized HTTP client + API_URL
│   ├── auth/
│   │   ├── api.ts              # Auth requests
│   │   ├── server.ts           # Server-side auth check (next/headers)
│   │   ├── useMe.ts            # Hook for fetching current user
│   │   └── getErrorMessage.ts  # Error message utility
│   ├── kalendarz/
│   │   ├── api.ts              # Public calendar API requests
│   │   └── adminApi.ts         # Admin event API requests
│   └── prefizApi.ts            # General API requests
├── messages/
│   ├── pl.json                 # Translations (Polish)
│   └── uk.json                 # Translations (Ukrainian)
└── i18n/
    ├── routing.ts              # Locale configuration
    └── navigation.ts           # Localized Link / redirect
```

---

## Key Architectural Decisions

### Centralized HTTP Client

All API requests go through `lib/http.ts`:

```ts
import { http } from "@/lib/http";

const data = await http<MyType>("/endpoint", {
  method: "POST",
  body: JSON.stringify(payload),
});
```

The client automatically:
- Adds `Content-Type: application/json` (skipped for `FormData`)
- Includes `credentials: "include"` for cookies
- Parses JSON or text responses
- Throws a typed `Error` with the server's error message

### Admin Route Protection

`app/[locale]/(admin)/layout.tsx` is an async Server Component that checks authorization via `lib/auth/server.ts` before rendering any page. Unauthorized users are automatically redirected to `/sign-in`.

### i18n

- Locales: `pl` (default), `uk`
- All strings stored in `messages/pl.json` and `messages/uk.json`
- Language switcher in the header
- Forms: Zod validation messages are built via `useMemo([t])` to support translations

### Responsive Design

- Mobile burger menu in the header (activates at ≤ 720px)
- Breakpoints: 480px (phones), 600px, 640px, 720px, 860px, 900px, 980px (tablets)
- Pure CSS Modules — no external CSS framework

---

## Routes

| URL | Description |
|-----|-------------|
| `/` | Home page |
| `/kalendarz` | Events calendar with filters |
| `/wydarzenia/[id]` | Event details and registration |
| `/sign-in` | Sign in |
| `/sign-up` | Sign up |
| `/profile` | User profile |
| `/admin/events/new` | Create event (admin only) |
| `/admin/registrations` | Registrations list (admin only) |
| `/*` | "In development" page |

All routes are available with a locale prefix: `/pl/...` or `/uk/...`

---

## Scripts

```bash
npm run dev      # Development mode
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
