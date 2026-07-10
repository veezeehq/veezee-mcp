# Veezee MCP server

LinkedIn people and company data for AI agents, over MCP or REST. This repo is the public home and issue tracker for the hosted server `io.veezee/linkedin` on the [official MCP Registry](https://registry.modelcontextprotocol.io). The server is a hosted service; there is nothing to build or run from this repo.

- Endpoint: `https://mcp.veezee.io/mcp` (streamable-http). Legacy HTTP+SSE: `https://mcp.veezee.io/sse`.
- Free trial: call the `provision` tool. 500 credits, no signup, no card, no key needed for that first call.
- Website and docs: https://veezee.io
- Found a bug or a gap? [Open an issue](https://github.com/veezeehq/veezee-mcp/issues) or write hello@veezee.io.

## The seven tools

| tool | what it does |
|---|---|
| `provision` | create a free trial account, returns your API key |
| `resolve_url` | identify a LinkedIn URL |
| `get_profile` | get a person profile |
| `search_people` | search people |
| `get_company` | get a company |
| `get_posts` | recent posts by a person or company |
| `get_usage` | check credits and recent charges (free) |

Full tool reference with schemas and credit costs: https://veezee.io/docs

## Install

Claude Code:

```
claude mcp add --transport http veezee https://mcp.veezee.io/mcp
```

Codex CLI:

```
codex mcp add veezee --url https://mcp.veezee.io/mcp
```

Cursor (`.cursor/mcp.json` or `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "veezee": { "url": "https://mcp.veezee.io/mcp" }
  }
}
```

VS Code (`.vscode/mcp.json`):

```json
{
  "servers": {
    "veezee": { "type": "http", "url": "https://mcp.veezee.io/mcp" }
  }
}
```

claude.ai: Settings > Connectors > Add custom connector > `https://mcp.veezee.io/mcp`.

More clients (Windsurf, Cline, Zed, plain REST), each snippet verified against the client's official docs: https://veezee.io/docs/clients

## REST twin

Every tool has a REST route with identical semantics at `https://api.veezee.io` (contract: https://veezee.io/openapi.json). A typed TypeScript SDK and CLI ship as [`@veezee/sdk`](https://www.npmjs.com/package/@veezee/sdk) (docs: https://veezee.io/docs/sdk).

## Links

- Agent setup guide: https://veezee.io/agent-setup/prompt.md
- Operating rules for agents: https://veezee.io/AGENTS.md
- Pricing: https://veezee.io/pricing
- What we store and how keys are handled: https://veezee.io/trust
- Skills packs: https://github.com/veezeehq/veezee-skills
