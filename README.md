# WORDIX

WORDIX - desktop/web Wordle clone на базе Next.js 16, Electron и Supabase.

Проект сочетает:
- ежедневную игру со словом дня (5 букв, 6 попыток);
- пользовательские профили и статистику;
- социальные функции (друзья, заявки, уведомления);
- кастомные слова пользователей;
- desktop-доставку через Electron с автообновлениями.

## Основные возможности

- Игра дня с проверкой попыток через Supabase RPC.
- Архив игр по дате (`/calendar`, выбор прошедших дат).
- Профиль игрока: статистика, стрик, редактирование профиля.
- Друзья: поиск, отправка/принятие/отклонение заявок, удаление связи.
- Аутентификация:
  - email/password;
  - OAuth (`google`, `github`).
- Пользовательские слова (длина 4-15, access: `public | friend_only | private`, difficulty: `easy | medium | hard`).
- В desktop-сборке:
  - встроенный запуск Next.js standalone-сервера;
  - проверка обновлений и установка через `electron-updater`.

## Технологии

- Frontend: Next.js 16 (App Router), React 19, TypeScript.
- UI: Tailwind CSS v4, shadcn/radix-like компоненты, Lucide.
- State: Zustand.
- Data fetching/cache: TanStack Query.
- Backend/BaaS: Supabase (Auth, Postgres, RPC, Realtime).
- Desktop: Electron + electron-builder + tsup.

## Архитектура

- `src/` - Next.js приложение (страницы, компоненты, hooks, клиент к Supabase).
- `electron/src/main.ts` - main process Electron.
- `electron/src/preload.ts` - bridge для IPC и updater API в `window`.
- `build/` - собранные файлы Electron main/preload (через `tsup`).
- `.next/standalone` - production-артефакты Next.js для упаковки в Electron.

В production desktop-режиме Electron:
1. поднимает локальный Next.js standalone-сервер на свободном порту;
2. открывает `BrowserWindow` на этот локальный URL;
3. подключает автообновления из GitHub Releases.

## Требования

- Node.js 20+.
- npm 10+ (или pnpm/yarn при необходимости).
- Аккаунт Supabase с настроенными таблицами и RPC.

## Переменные окружения

Файл `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SB_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_SECRET_KEY=
```

Использование в коде:
- Client: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SB_PUBLISHABLE_KEY`.
- Server/API: `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY`.

Важно:
- `SUPABASE_SERVICE_ROLE_KEY` нельзя публиковать.
- если ключи уже попали в git-историю, их нужно немедленно ротировать в Supabase.

## Быстрый старт (Web)

```bash
npm install
npm run next:dev
```

Приложение будет доступно на `http://localhost:3000`.

## Быстрый старт (Electron + Next.js)

Терминал 1:

```bash
npm run next:dev
```

Терминал 2:

```bash
npm run electron:dev
```

`electron:dev` поднимает watch-сборку Electron (`tsup --watch`) и перезапускает app через `nodemon`.

## Скрипты

- `npm run next:dev` - dev Next.js (`--turbopack`).
- `npm run next:build` - production build Next.js (`standalone`).
- `npm run next:start` - запуск production Next.js.
- `npm run next:lint` - ESLint.
- `npm run typecheck` - проверка TypeScript.
- `npm run format` - форматирование (`dprint`).

- `npm run electron:build` - сборка main/preload в `build/`.
- `npm run electron:build_watch` - watch сборка Electron.
- `npm run electron:dev` - dev Electron (watch + nodemon).
- `npm run electron:dist` - упаковка app в директорию.
- `npm run electron:dist:deb` - Linux `.deb`.
- `npm run electron:release` - релиз через `electron-builder --publish always`.

- `npm run build` - `next:build + electron:build`.
- `npm run dist` - полный цикл `build + electron:release`.

## Сборка релиза

```bash
npm run build
npm run electron:dist
```

Или для публикации релиза (при настроенном GitHub provider):

```bash
npm run dist
```

Текущая конфигурация `electron-builder`:
- `win`: `nsis` installer;
- `linux`: `deb`;
- publish provider: GitHub (`Roman13-k/wordle-clone`).

## Требуемая схема Supabase

Проект использует таблицы:
- `profiles`
- `user_games`
- `user_plays`
- `user_friends`

И RPC-функции:
- `get_daily_word_with_hints`
- `check_guess_by_date`
- `get_user_profile_with_relationship`
- `get_user_stats`
- `send_friend_request`

Для корректной работы также нужны политики RLS и права доступа под ваш auth-flow.

## API

- `POST /api/delete-user`
  - удаляет пользователя через `supabaseAdmin.auth.admin.deleteUser`.
  - требует server-side ключ `SUPABASE_SERVICE_ROLE_KEY`.

## Структура роутов

- `/` - главная.
- `/game` - игра дня.
- `/game?date=YYYY-MM-DD` - игра за выбранную дату.
- `/calendar` - архив дат.
- `/profile` - мой профиль.
- `/profile/[id]` - профиль другого пользователя.

## Известные особенности

- Кодовая база в основном ориентирована на desktop-сценарий (Electron + web UI).
- Дата игры и rollover кэша завязаны на UTC (через `getUTCToday` и `msUntilNextUTCDay`).
- Есть `Makefile`, но основная и наиболее актуальная оркестрация - через npm scripts из `package.json`.

## Рекомендации для production

- вынести `SUPABASE_SERVICE_ROLE_KEY` и другие секреты в защищённый secret manager/CI variables;
- добавить миграции БД (SQL) в репозиторий (`supabase/migrations`), чтобы инфраструктура разворачивалась воспроизводимо;
- добавить smoke/e2e тесты для критичных сценариев: логин, игра, запись результата, friend requests;
- включить CI pipeline (`lint + typecheck + build`) на каждый PR.

## Лицензия

Лицензия не указана. Добавьте `LICENSE`, если планируется публичное распространение.
