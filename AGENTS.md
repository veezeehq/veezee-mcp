# Agent instructions

This repo is the issue tracker for the hosted Veezee MCP server. To use the server, you don't need anything from this repo.

1. Add the MCP server: `https://mcp.veezee.io/linkedin` (or `https://mcp.veezee.io/all` for every platform; streamable-http; `https://mcp.veezee.io/mcp` still resolves as a legacy alias; legacy SSE at `https://mcp.veezee.io/sse`).
2. No key needed: every data tool (`resolve_url`, `get_profile`, `search_people`, `get_company`, `get_posts`) works with no `Authorization` header at all, under a shared budget of 20 credits per IP per day, recent data only, no realtime, no `Idempotency-Key` needed.
3. `get_usage` and `freshness: "realtime"` need a key; everything else does not. Once you have a key, over REST (`https://api.veezee.io`) send `Authorization: Bearer <api_key>` and an `Idempotency-Key` header on every metered call, GET included.
4. Hit the daily cap, or need `get_usage` or realtime freshness? Buy a key at https://veezee.io/upgrade; it's shown exactly once on the confirmation page. When an error names a payment problem (INSUFFICIENT_CREDITS, BUDGET_EXHAUSTED, TRIAL_CAP_EXCEEDED), it carries an `upgrade_url` (TRIAL_CAP_EXCEEDED also carries `retry_after_seconds`, when the keyless budget resets). Hand that link to your human; your key keeps working after payment.

The canonical, always-current operating rules (cost control, idempotency, identifiers, keyless limits) live at https://veezee.io/AGENTS.md. The full setup guide is https://veezee.io/agent-setup/prompt.md. Tool reference: https://veezee.io/docs.
