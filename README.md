# Veezee MCP server

LinkedIn people and company data for AI agents, over MCP or REST. This repo is the public home and issue tracker for the hosted server `io.veezee/linkedin` on the [official MCP Registry](https://registry.modelcontextprotocol.io). The server is a hosted service; there is nothing to build or run from this repo.

- Endpoint: `https://mcp.veezee.io/linkedin` (streamable-http, LinkedIn only). `https://mcp.veezee.io/all` exposes every platform's tools. `https://mcp.veezee.io/mcp` still resolves too, as a legacy alias (the MCP Registry entry points at it). Legacy HTTP+SSE: `https://mcp.veezee.io/sse`.
- No key needed to start: every data tool works keyless, under a shared budget of 20 credits per IP per day, recent data only. Buy a key at https://veezee.io/upgrade for a higher budget; it's shown once on the confirmation page.
- Website and docs: https://veezee.io
- Found a bug or a gap? [Open an issue](https://github.com/veezeehq/veezee-mcp/issues) or write hello@veezee.io.

## The six tools

| tool | what it does |
|---|---|
| `resolve_url` | identify a LinkedIn URL |
| `get_profile` | get a person profile |
| `search_people` | search people |
| `get_company` | get a company |
| `get_posts` | recent posts by a person or company |
| `get_usage` | check credits and recent charges (free; needs a key) |

Full tool reference with schemas and credit costs: https://veezee.io/docs

## Install

Claude Code:

```
claude mcp add --transport http veezee https://mcp.veezee.io/linkedin
```

Codex CLI:

```
codex mcp add veezee --url https://mcp.veezee.io/linkedin
```

Cursor (`.cursor/mcp.json` or `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "veezee": { "url": "https://mcp.veezee.io/linkedin" }
  }
}
```

VS Code (`.vscode/mcp.json`):

```json
{
  "servers": {
    "veezee": { "type": "http", "url": "https://mcp.veezee.io/linkedin" }
  }
}
```

claude.ai: Settings > Connectors > Add custom connector > `https://mcp.veezee.io/linkedin`.

More clients (Windsurf, Cline, Zed, plain REST), each snippet verified against the client's official docs: https://veezee.io/docs/clients

## REST twin

Every tool has a REST route with identical semantics at `https://api.veezee.io` (contract: https://veezee.io/openapi.json). A typed TypeScript SDK and CLI ship as [`@veezee/sdk`](https://www.npmjs.com/package/@veezee/sdk) (docs: https://veezee.io/docs/sdk).

## Links

- Agent setup guide: https://veezee.io/agent-setup/prompt.md
- Operating rules for agents: https://veezee.io/AGENTS.md
- Pricing: https://veezee.io/pricing
- What we store and how keys are handled: https://veezee.io/trust
- Skills packs: https://github.com/veezeehq/veezee-skills
