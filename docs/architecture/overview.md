# Architecture — hello-word-21

## Scope
Fullstack proof page. PostgreSQL stores one greeting row, Go backend exposes it, Next.js frontend renders it centered. No auth, user input, animation, palette, header, footer, loading, empty, or error screen.

## Stack
| Part | Choice | Reason | Rejected alternative |
|---|---|---|---|
| Frontend | Next.js 15 App Router, TypeScript, Tailwind v3 | Matches repo pipeline and static single page needs | Plain HTML would not match deployed frontend contract |
| Backend | Go 1.22 HTTP server | Small stdlib server, fast build, matches default backend | Node API would add second runtime |
| Database | PostgreSQL 16 | Required source of greeting | Frontend constant violates SRS |
| CI | `.github/workflows/ci.yml` | Existing protected gate for build, vet, lint, token checks | Custom workflow forbidden |

## Code layout
```text
code/backend/
  cmd/api/main.go
  internal/migrations/migrations.go
  internal/migrations/sql/*.sql
  .env.example
  Dockerfile
code/frontend/
  app/layout.tsx
  app/page.tsx
  app/globals.css
  .env.example
  Dockerfile
```
`app/page.tsx` stays composition root. Story components go in `code/frontend/components/` and are mounted by one import plus one element. Component files use `export default function ComponentName()`.

## Data flow
Browser loads Next.js page. Frontend story component will call backend `GET /v1/greeting` using `NEXT_PUBLIC_API_URL`. Backend reads PostgreSQL and returns JSON. Database seed migration creates exactly one row with `Hello Word`.

## Runtime contracts
- Backend must read `DATABASE_URL` and `PORT`; `APP_PORT` fallback exists only for local compatibility.
- Backend applies all embedded SQL migrations at boot before listening.
- `/healthz` returns 200 only after migrations and `SELECT 1` succeed.
- Docker Compose boots DB, backend, frontend from repo root.

## Environment
### Root `.env.example`
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: local Compose database.
- `BACKEND_PORT`, `FRONTEND_PORT`: optional host ports.
- `NEXT_PUBLIC_API_URL`: browser-visible backend URL.

### Backend `.env.example`
- `DATABASE_URL`: PostgreSQL URL injected by runtime.
- `PORT`: HTTP listen port, default 8080.
- `APP_PORT`: optional legacy fallback.

### Frontend `.env.example`
- `NEXT_PUBLIC_API_URL`: backend base URL, no `/api` prefix.

## Naming conventions
- SQL migrations: timestamp prefix, `.up.sql` and `.down.sql` pairs.
- API paths: `/v1/...`, never `/api/...`.
- JSON error envelope: `{"error":{"code":"...","message":"..."}}`.
- CSS values use tokens from `app/globals.css`; no token fallbacks.

## Failure handling
Backend returns generic JSON errors, logs internal details to stderr, and sets non-2xx status. No frontend error state is designed, so feature work must not add visible error UI unless requirements change.

## Observability
Use standard HTTP status codes plus stderr logs. No metrics or tracing; add only when project has more than one endpoint or non-trivial latency risk.

## Run
```bash
cp .env.example .env
docker compose --profile local up --build
```
Frontend: `http://localhost:3000`. Backend health: `http://localhost:8080/healthz`.

## Local checks
```bash
cd code/backend && go build ./... && go vet ./... && go test ./...
cd code/frontend && npm ci && npm run lint && npm run build && npm test --if-present
```

## Risks
- `NEXT_PUBLIC_API_URL` is build-time visible to browser; set it to public backend URL in deployed builds.
- Schema is intentionally one-table; more greetings need SRS and ERD revision.
