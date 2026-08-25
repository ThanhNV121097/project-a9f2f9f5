# Story — Store greeting in DB

## User story
As backend service, I want read one greeting from PostgreSQL, so page can show stored text instead of frontend constant.

## Scope

### In scope
- Store one public greeting value in PostgreSQL for `hello-word`.
- Backend API reads stored greeting and returns it for page data.
- Guest sees current stored text on centered greeting page.
- Changing stored value changes page text after next page load.

### Out of scope
- Header, footer, palette, animation, loading, and empty states.
- Any other pages or routes.
- Frontend hardcoded greeting.

## UI scope
Centered greeting page only. No new screens, no alternate states. Uses approved design: white canvas, black centered text, `h1` inside labeled `main`.

## Acceptance criteria
1. Given stored greeting is `Hello Word`, when guest requests page, then page shows `Hello Word` centered on screen.
2. Given stored greeting is changed to `Hello World`, when guest requests page again, then page shows `Hello World` centered on screen.
3. Given stored greeting changes in DB, when backend/API returns page data, then returned greeting matches stored value.
4. Frontend does not hardcode greeting text.

## Dependencies
- PostgreSQL available as greeting store.
- Backend API available to read greeting row and serve page data.
- One greeting row exists for `hello-word`.
