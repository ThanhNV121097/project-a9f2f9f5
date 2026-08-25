# Test Cases — Store greeting in DB

Risk level: low. One public read-only flow, no roles, no user input, no state transitions beyond stored text change.

## Automated coverage

**Scenario**: Stored greeting renders on page
**Given** PostgreSQL row for public greeting contains `Hello Word`
**When** guest requests page
**Then** page displays exactly `Hello Word` centered on screen
**Check**: render_url
**Traceability**: HELLO-WORD-001 AC-1

**Scenario**: Changing stored greeting changes page text
**Given** PostgreSQL row for public greeting changed to `Hello World`
**When** guest requests page again
**Then** page displays exactly `Hello World` centered on screen
**Check**: render_url
**Traceability**: HELLO-WORD-001 AC-2

**Scenario**: Backend API returns stored greeting value
**Given** PostgreSQL row for public greeting contains any stored text value
**When** backend/API returns page data
**Then** JSON response greeting field matches stored value exactly
**Check**: fetch_url
**Traceability**: HELLO-WORD-001 AC-3

**Scenario**: Backend API success shape
**Given** PostgreSQL row for public greeting contains `Hello Word`
**When** guest requests `GET /v1/greeting`
**Then** response status is `200` and body is `{"greeting":"Hello Word"}`
**Check**: fetch_url
**Traceability**: services.md GET /v1/greeting success contract

**Scenario**: Backend API error envelope on internal failure
**Given** backend cannot read greeting from PostgreSQL
**When** guest requests `GET /v1/greeting`
**Then** response status is `500` and body matches `{"error":{"code":"internal_error","message":"Something went wrong"}}`
**Check**: fetch_url
**Traceability**: services.md GET /v1/greeting error contract

## Manual coverage

**Scenario**: Greeting is centered horizontally and vertically
**Given** PostgreSQL row for public greeting contains `Hello Word`
**When** guest opens page
**Then** visible greeting sits centered horizontally and vertically on screen
**Check**: manual
**Traceability**: HELLO-WORD-001 AC-1, AC-2

**Scenario**: Page uses plain white background and black text
**Given** PostgreSQL row for public greeting contains `Hello Word`
**When** guest opens page
**Then** page shows pure white background and pure black greeting text
**Check**: measure_styles
**Traceability**: design.spec, HELLO-WORD-001 AC-1

**Scenario**: Page has no animation, header, footer, loading, or empty state
**Given** PostgreSQL row for public greeting contains `Hello Word`
**When** guest opens page and waits for page to settle
**Then** only static greeting page is visible and no animated, loading, header, footer, or empty-state UI appears
**Check**: manual
**Traceability**: SRS scope, design.spec
