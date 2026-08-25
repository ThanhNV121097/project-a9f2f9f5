# SRS — hello-word-21

Module: `hello-word`
Last updated: 2025-08-14
Design: [View the approved design](http://localhost:8080/design/a9f2f9f5-bc88-4339-ac37-e870bcd42e40)
Design system: `design/design-system.md`

## 1. Purpose

`hello-word` proves the delivery pipeline end to end with one minimal public page. It stores one greeting in PostgreSQL, serves it through backend API, and renders that value centered on screen. Without it, the project loses its only end-to-end check that data, API, and UI are wired together.

## 2. Actors

| Actor | Who they are | What they may do in this module |
|---|---|---|
| Guest | Any browser visitor | View centered greeting page |
| Backend service | Server-side application | Read greeting row and return it to the page |
| Database | PostgreSQL instance | Persist exactly one greeting row |

## 3. Scope

**In scope** — the functions specified below, by their plan titles:

- Store greeting in DB

**Out of scope** — name what a reader would reasonably expect here and say where it lives instead.

- Header, footer, palette, animation, loading, and empty states — deliberately not built; approved design shows one static centered greeting only.
- Any other pages or routes — not part of `hello-word`.

## 4. Functional requirements

### 4.1 Store greeting in DB

**Requirement HELLO-WORD-001 — Persist single greeting source**

*As a* backend service, *I want to* read one greeting from PostgreSQL, *so that* the page can show stored text instead of a frontend constant.

Behaviour:

1. Database holds one greeting value for this module.
2. Backend service reads the stored greeting value when serving the page data.
3. Guest sees whatever text is currently stored.
4. Changing stored value changes what the page shows after the next page load.

**Acceptance criteria** — each maps one-to-one onto a test case in `docs/hello-word/test-cases/store-greeting-in-db.md`.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Stored greeting is `Hello Word` | Guest requests page | Page shows `Hello Word` centered on screen |
| AC-2 | Stored greeting is changed to `Hello World` | Guest requests page again | Page shows `Hello World` centered on screen |
| AC-3 | Stored greeting changes in DB | Backend/API returns page data | Returned greeting matches stored value |

**Failure, boundary and permission behaviour** — approved design shows no error, loading, empty, or permission state. Not applicable: this is a public single-read flow with no roles, no user input, and no alternate screen state in the approved design.

| Case | Condition | Expected behaviour |
|---|---|---|
| — | — | Not applicable: approved design has one static default screen only |

**Data touched** — the fields this function reads and writes, in product terms.

| Field | Type | Required | Rule |
|---|---|---|---|
| Greeting text | text | yes | Exactly one stored value for the public greeting |

## 5. Screens

| Screen | Section in the design | Functions it serves | States that must exist |
|---|---|---|---|
| Centered greeting page | Main screen | HELLO-WORD-001 | default |

## 6. Non-functional requirements

| Area | Requirement |
|---|---|
| Accessibility | Page keeps 4.5:1 contrast between text and background. |
| Responsive | Page fits at 320px width and up with no horizontal scroll. |
| Localisation | Copy is English only. |
| Privacy | No personal data is stored; only one public greeting string is persisted. |

## 7. Dependencies and assumptions

- **Depends on:** PostgreSQL, for storing the greeting.
- **Depends on:** backend API, for reading the greeting and serving page data.
- **Assumption:** one row is enough for the module; if that changes, scope needs revision.

| Open question | Proposed default | Who decides |
|---|---|---|
| None | Not applicable | Stakeholder |

## 8. Traceability

| Plan item | Requirement ids | Test cases |
|---|---|---|
| Store greeting in DB | HELLO-WORD-001 | `test-cases/store-greeting-in-db.md` |
