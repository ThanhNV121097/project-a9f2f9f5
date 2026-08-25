# ERD — hello-word-21

## Tables

### greetings
| Column | Type | Constraints | Purpose |
|---|---|---|---|
| `id` | integer | primary key, `id = 1` enforced | Single greeting row identity |
| `text` | text | not null, not empty | Public greeting displayed on page |
| `updated_at` | timestamptz | not null, default `now()` | Last content update timestamp |

## Relationships
None. One table only.

## Seed data
Migration inserts one row:

| id | text |
|---|---|
| 1 | `Hello Word` |

## Notes
`CHECK (id = 1)` keeps one-row model explicit. If product needs multiple greetings, revise SRS and replace this constraint with real ownership/selection rules.
