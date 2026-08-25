# Test Cases — Store greeting in DB

Risk level: low. One public read-only flow, one row, no user input, no permissions.

## Automated coverage

### Scenario: Page shows stored greeting from PostgreSQL
**Given** PostgreSQL stores one greeting row with text `Hello Word`, backend API is running, and browser loads centered greeting page
**When** guest requests page
**Then** page shows exactly `Hello Word` and nothing else in greeting area, centered on screen
**Check:** render_url

### Scenario: Changing stored greeting changes page text on next load
**Given** PostgreSQL greeting row is changed from `Hello Word` to `Hello World`, backend API is running, and browser has no cached page data
**When** guest requests page again
**Then** page shows exactly `Hello World` and not `Hello Word`
**Check:** render_url

### Scenario: Backend API returns stored greeting value
**Given** PostgreSQL stores greeting text `Hello Word` and backend API is running
**When** client requests `GET /v1/greeting`
**Then** response status is `200` and JSON body is `{"greeting":"Hello Word"}`
**Check:** fetch_url

### Scenario: Greeting value shown on page comes from API response, not frontend constant
**Given** PostgreSQL greeting row is changed to `Hello World` and backend API returns that value
**When** guest loads page
**Then** browser displays `Hello World` and page data source matches API value
**Check:** render_url

## Contract coverage

### Scenario: Health check returns ok when database is ready
**Given** migrations are applied and database `SELECT 1` succeeds
**When** client requests `GET /healthz`
**Then** response status is `200` and body is `{"status":"ok"}`
**Check:** fetch_url

### Scenario: Greeting endpoint uses no request fields
**Given** backend API is running
**When** client requests `GET /v1/greeting` with no body and no query parameters
**Then** server ignores any unsupported body or query input and returns stored greeting only
**Check:** fetch_url

### Scenario: Greeting endpoint failure uses documented error envelope
**Given** backend API cannot read greeting from database
**When** client requests `GET /v1/greeting`
**Then** response status is `500` and body matches `{ "error": { "code": "internal_error", "message": "Something went wrong" } }`
**Check:** fetch_url

## Manual coverage

### Scenario: Greeting page is centered vertically and horizontally
**Given** page loads with stored greeting text
**When** person views page
**Then** greeting sits centered both horizontally and vertically in viewport
**Check:** measure_styles

### Scenario: Greeting page uses pure white background and pure black text
**Given** page loads with stored greeting text
**When** person views page
**Then** background is `#ffffff` and greeting text is `#000000`
**Check:** measure_styles

### Scenario: Greeting page has no animation
**Given** page loads with stored greeting text
**When** person watches page for a few seconds
**Then** nothing animates or moves after initial render
**Check:** measure_styles
