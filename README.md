# Glimmora Mind V2 – Frontend

AI-powered emotional wellbeing platform (frontend-first with mocked APIs).

## Stack

- **Next.js** (App Router), **TypeScript**, **TailwindCSS**
- **TanStack Query**, **Zustand**, **Recharts**
- Design system: primitives under `src/components/ui/` (button, card, modal, input, avatar, badge)

## Architecture

- **UI** → **Hooks** → **API service layer** → **Mock data**
- UI never imports from `src/mock/`. All data flows through `src/shared/hooks` and `src/shared/services/api`.
- Shared logic (`shared/hooks`, `shared/services`, `shared/types`, `shared/store`) is reusable for a future React Native app.

## Getting started

```bash
npm install
npm run dev
```

- **Landing:** [http://localhost:3000](http://localhost:3000)
- **Login (mock):** use `jane@example.com` with any password
- **Sign up:** any email/name/password (mock only)

## Routes

| Route        | Description                |
| ------------ | -------------------------- |
| `/`          | Landing                    |
| `/login`     | Log in                     |
| `/signup`    | Sign up                    |
| `/dashboard` | Dashboard (quick actions)  |
| `/chat`      | AI emotional companion     |
| `/mood`      | Mood tracking & journal    |
| `/therapists`| Therapist marketplace     |
| `/booking`   | Book session (?therapist=id) |
| `/insights`  | Emotional insights (charts)|

## Project structure

```
src/
├── shared/          # Platform-agnostic (hooks, services, types, store, utils)
├── mock/            # Mock data (only imported by services)
├── app/             # Next.js App Router pages & layout
├── components/      # Feature components + layouts
│   ├── ui/          # Design system primitives
│   ├── auth/
│   ├── chat/
│   ├── mood/
│   ├── therapists/
│   ├── booking/
│   ├── insights/
│   └── layouts/
└── lib/             # queryClient, utils
```

## Replacing mock APIs

When the backend is ready, replace the implementation inside each file under `src/shared/services/api/` with real `fetch` or axios calls. Keep the same function signatures and return types so hooks and UI do not need changes.

## Design system

See `src/components/ui/README.md` for button, card, modal, input, avatar, and badge usage.
