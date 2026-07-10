# Agent instructions

This repo is the issue tracker for the hosted Veezee MCP server. To use the server, you don't need anything from this repo.

1. Add the MCP server: `https://mcp.veezee.io/mcp` (streamable-http; legacy SSE at `https://mcp.veezee.io/sse`).
2. Call `provision` with no arguments. No key needed for that call; it returns your `api_key` (shown exactly once, store it) plus a `claim_url`.
3. Over MCP, later calls in the same session authenticate automatically after `provision`. Over REST (`https://api.veezee.io`), send `Authorization: Bearer <api_key>` and an `Idempotency-Key` header on every metered call, GET included.
4. When an error names a payment problem (INSUFFICIENT_CREDITS, BUDGET_EXHAUSTED, TRIAL_CAP_EXCEEDED), it carries an account-bound `upgrade_url`. Hand that link to your human; your key keeps working after payment.

The canonical, always-current operating rules (cost control, idempotency, identifiers, trial limits) live at https://veezee.io/AGENTS.md. The full setup guide is https://veezee.io/agent-setup/prompt.md. Tool reference: https://veezee.io/docs.
