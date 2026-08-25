package migrations

import "embed"

// Files contains SQL migrations embedded at build time.
//
//go:embed sql/*.sql
var Files embed.FS
