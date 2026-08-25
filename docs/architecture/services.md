# Services — hello-word-21

## Shared conventions
- Paths omit `/api`; deploy proxy strips that prefix before backend.
- Responses are JSON.
- Public endpoints require no authentication.
- Error envelope:

```json
{
  "error": {
    "code": "internal_error",
    "message": "Something went wrong"
  }
}
```

## Endpoints

### GET /healthz
Health check used by Compose and runtime.

Auth: none.

Request: none.

Success `200`:

```json
{"status":"ok"}
```

Failure: non-200 or connection failure. Backend only returns 200 after migrations and database `SELECT 1` succeed.

### GET /v1/greeting
Returns stored public greeting.

Auth: none.

Request: none.

Success `200` matches approved UI mock module `GreetingResponse` from `code/frontend/lib/mock/store-greeting-in-db.ts`:

```json
{
  "greeting": "Hello Word"
}
```

Errors:
| Status | Code | Message |
|---|---|---|
| 500 | `internal_error` | `Something went wrong` |

Notes:
- API reads `greetings.text` where `id = 1` and returns it as `greeting`.
- No pagination; endpoint returns one object.
- No write endpoint exists. Changing greeting for acceptance testing may be done directly in PostgreSQL until scope adds administration.

## Migration plan

Forward:
1. Run schema migration that creates `greetings` table.
2. Seed row `(id = 1, text = 'Hello Word')`.
3. Backend `GET /healthz` returns `200` only after migrations and database `SELECT 1` succeed.

Backward:
1. Stop backend that serves `GET /v1/greeting` from `greetings`.
2. Run rollback that deletes row `id = 1` and drops `greetings`.

Safety:
- Forward migration is safe on populated database because it adds one new table and seed row only.
- Backward migration removes this story's only stored value; safe before production data matters, destructive after stakeholder-edited greeting exists.
