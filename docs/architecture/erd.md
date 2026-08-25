# ERD — hello-word-21

## Tables

### greetings
| Column | Type | Constraints | Purpose |
|---|---|---|---|
| `id` | integer | primary key, `id = 1` enforced | Single greeting row identity |
| `text` | text | not null, not empty | Public greeting displayed on page |
| `updated_at` | timestamptz | not null, default `now()` | Last content update timestamp |

Table constraints:
- `CHECK (id = 1)` enforces exactly one addressable greeting row.
- `CHECK (length(btrim(text)) > 0)` rejects empty or whitespace-only greeting text.

Indexes:
- Primary key on `id` serves `SELECT text FROM greetings WHERE id = 1` for `GET /v1/greeting`.

## Relationships
None. One table only.

## Seed data
Migration inserts one row:

| id | text |
|---|---|
| 1 | `Hello Word` |

## Migration plan

Forward:
1. Create `greetings` table with `id`, `text`, `updated_at`, single-row `CHECK`, and non-empty text `CHECK`.
2. Insert seed row `(1, 'Hello Word')`.

Backward:
1. Delete row `id = 1`.
2. Drop `greetings` table.

Safety:
- Safe on empty database.
- Safe on populated database because table is new for this module and has no foreign keys.
- Rollback deletes only this module's greeting table.

## Notes
`CHECK (id = 1)` keeps one-row model explicit. If product needs multiple greetings, revise SRS and replace this constraint with real ownership/selection rules.
