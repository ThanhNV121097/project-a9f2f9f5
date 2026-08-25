# Services — hello-word-21

## Shared conventions
- Paths omit `/api`; deploy proxy strips that prefix before backend.
- Responses are JSON.
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

Request: none.

Success `200`:

```json
{"status":"ok"}
```

Failure: non-200 or connection failure. Backend only returns 200 after migrations and database `SELECT 1` succeed.

### GET /v1/greeting
Returns stored public greeting.

Request: none.

Success `200`:

```json
{
  "greeting": "Hello Word"
}
```

Errors:
| Status | Code | Message |
|---|---|---|
| 500 | `internal_error` | `Something went wrong` |

No write endpoint exists. Changing greeting for acceptance testing may be done directly in PostgreSQL until scope adds administration.
