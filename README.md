# WORDIX

WORDIX — a desktop/web Wordle clone built with Next.js 16, Electron, and Supabase.

The project combines:
- daily word-of-the-day gameplay (5 letters, 6 attempts);
- user profiles and statistics;
- social features (friends, requests, notifications);
- custom user words;
- desktop delivery via Electron with auto-updates.

## Features

- Daily game with guess validation via Supabase RPC.
- Game archive by date (`/calendar`, pick past dates).
- Player profile: stats, streak, profile editing.
- Friends: search, send/accept/decline requests, remove connection.
- Authentication:
  - email/password;
  - OAuth (`google`, `github`).
- Custom words (length 4–15, access: `public | friend_only | private`, difficulty: `easy | medium | hard`).
- In the desktop build:
  - embedded Next.js standalone server startup;
  - update check and install via `electron-updater`.

## Tech Stack

- Frontend: Next.js 16 (App Router), React 19, TypeScript.
- UI: Tailwind CSS v4, shadcn/radix-like components, Lucide.
- State: Zustand.
- Data fetching/cache: TanStack Query.
- Backend/BaaS: Supabase (Auth, Postgres, RPC, Realtime).
- Desktop: Electron + electron-builder + tsup.

## Architecture

- `src/` — Next.js app (pages, components, hooks, Supabase client).
- `electron/src/main.ts` — Electron main process.
- `electron/src/preload.ts` — bridge for IPC and updater API on `window`.
- `build/` — built Electron main/preload artifacts (via `tsup`).
- `.next/standalone` — Next.js production artifacts for packaging in Electron.

In production desktop mode, Electron:
1. starts a local Next.js standalone server on a free port;
2. opens a `BrowserWindow` to that local URL;
3. wires auto-updates from GitHub Releases.

## Requirements

- Node.js 20+.
- npm 10+ (or pnpm/yarn if preferred).
- A Supabase project with the required tables and RPCs configured.

## Environment Variables

`.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SB_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_SECRET_KEY=
```

Usage in code:
- Client: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SB_PUBLISHABLE_KEY`.
- Server/API: `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY`.

Important:
- Do not expose `SUPABASE_SERVICE_ROLE_KEY`.
- If keys have ever been committed to git history, rotate them in Supabase immediately.

## Quick Start (Web)

```bash
npm install
npm run next:dev
```

The app will be available at `http://localhost:3000`.

## Quick Start (Electron + Next.js)

Terminal 1:

```bash
npm run next:dev
```

Terminal 2:

```bash
npm run electron:dev
```

`electron:dev` runs a watch build of Electron (`tsup --watch`) and restarts the app via `nodemon`.

## Scripts

- `npm run next:dev` — Next.js dev server (`--turbopack`).
- `npm run next:build` — Next.js production build (`standalone`).
- `npm run next:start` — run production Next.js.
- `npm run next:lint` — ESLint.
- `npm run typecheck` — TypeScript check.
- `npm run format` — formatting (`dprint`).

- `npm run electron:build` — build main/preload into `build/`.
- `npm run electron:build_watch` — Electron watch build.
- `npm run electron:dev` — Electron dev (watch + nodemon).
- `npm run electron:dist` — package app into output directory.
- `npm run electron:dist:deb` — Linux `.deb` package.
- `npm run electron:release` — release via `electron-builder --publish always`.

- `npm run build` — `next:build` + `electron:build`.
- `npm run dist` — full cycle: `build` + `electron:release`.

## Release Build

```bash
npm run build
npm run electron:dist
```

Or to publish a release (with GitHub provider configured):

```bash
npm run dist
```

Current `electron-builder` config:
- `win`: `nsis` installer;
- `linux`: `deb`;
- publish provider: GitHub (`Roman13-k/wordle-clone`).

## Required Supabase Schema

The project uses tables:
- `profiles`
- `user_games`
- `user_plays`
- `user_friends`

And RPC functions:
- `get_daily_word_with_hints`
- `check_guess_by_date`
- `get_user_profile_with_relationship`
- `get_user_stats`
- `send_friend_request`

RLS policies and permissions must be set up for your auth flow to work correctly.

## API

- `POST /api/delete-user`
  - deletes a user via `supabaseAdmin.auth.admin.deleteUser`.
  - requires server-side key `SUPABASE_SERVICE_ROLE_KEY`.

## Route Structure

- `/` — home.
- `/game` — daily game.
- `/game?date=YYYY-MM-DD` — game for a specific date.
- `/calendar` — date archive.
- `/profile` — my profile.
- `/profile/[id]` — another user’s profile.

## Known Notes

- The codebase is primarily geared toward the desktop scenario (Electron + web UI).
- Game date and cache rollover are based on UTC (via `getUTCToday` and `msUntilNextUTCDay`).
- A `Makefile` exists, but the main and most up-to-date orchestration is via npm scripts in `package.json`.

## Production Recommendations

- Store `SUPABASE_SERVICE_ROLE_KEY` and other secrets in a secure secret manager or CI variables;
- Add DB migrations (SQL) to the repo (`supabase/migrations`) so infrastructure can be reproduced;
- Add smoke/e2e tests for critical flows: login, gameplay, saving results, friend requests;
- Enable a CI pipeline (`lint` + `typecheck` + `build`) on every PR.

## License

No license specified. Add a `LICENSE` file if you plan to distribute the project publicly.
