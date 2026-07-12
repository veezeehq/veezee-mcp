# Veezee MCP server

LinkedIn, Reddit, and X (formerly Twitter) data for AI agents, over MCP or REST. This repo is the public home and issue tracker for the hosted servers on the [official MCP Registry](https://registry.modelcontextprotocol.io): `io.veezee/linkedin` (3.0.0), `io.veezee/reddit` (1.0.0), and `io.veezee/x-twitter` (1.0.0). The server is a hosted service; there is nothing to build or run from this repo.

- No key needed to start: every data tool works keyless, under a shared budget of 20 credits per IP per day across all platforms, recent data only. Buy a key at https://veezee.io/upgrade for a higher budget; it's shown once on the confirmation page.
- Website and docs: https://veezee.io
- Found a bug or a gap? [Open an issue](https://github.com/veezeehq/veezee-mcp/issues) or write hello@veezee.io.

## Mounts

Four endpoints, all streamable-http, same auth and pricing:

| mount | covers |
|---|---|
| `https://mcp.veezee.io/linkedin` | LinkedIn only (5 tools + `get_usage`) |
| `https://mcp.veezee.io/reddit` | Reddit only (6 tools + `get_usage`) |
| `https://mcp.veezee.io/x` | X (formerly Twitter) only (5 tools + `get_usage`) |
| `https://mcp.veezee.io/all` | Every platform (17 tools + `get_usage`) |

Pick a single-platform mount when your agent only needs one platform: a smaller tool list is easier for the model to pick from correctly and costs less context per turn. Pick `/all` when one task spans platforms, e.g. a research brief that pulls LinkedIn, Reddit, and X signal on the same account, or a monitoring loop that watches more than one platform at once.

## The 17 tools

**LinkedIn** (`https://mcp.veezee.io/linkedin`)

| tool | what it does | credits |
|---|---|---|
| `linkedin_resolve_url` | identify a LinkedIn URL | 2 |
| `linkedin_get_profile` | get a person profile | 4 base (2 sections included, +2/section, max 4) |
| `linkedin_search_people` | search people | 10 base (10 results included, +1/10 more, max 30) |
| `linkedin_get_company` | get a company | 4 base (+4 to resolve a new domain) |
| `linkedin_get_posts` | recent posts by a person or company | 4/page (+4 to resolve a new domain) |

**Reddit** (`https://mcp.veezee.io/reddit`)

| tool | what it does | credits |
|---|---|---|
| `reddit_search` | search posts, comments, subreddits, or users | 6/page |
| `reddit_get_subreddit` | get subreddit details | 4 base (+2 for rules and moderators) |
| `reddit_get_subreddit_posts` | get a subreddit's posts | 4/page |
| `reddit_get_user` | get a Reddit user | 4 base (+2/section, max 2) |
| `reddit_get_post` | get posts by id, with an optional discussion thread | 4 for up to 10 ids (+1/10 more, max 100; +4 for the full thread or one comment in context) |
| `reddit_resolve_url` | identify a Reddit URL | 2 |

**X, formerly Twitter** (`https://mcp.veezee.io/x`)

| tool | what it does | credits |
|---|---|---|
| `x_search` | search X (formerly Twitter) | 6/page |
| `x_get_profile` | get an X profile | 4 |
| `x_get_tweets` | get an account's tweets | 4/page |
| `x_get_tweet` | get one tweet with full metrics | 4 |
| `x_resolve_url` | identify an X URL | 2 |

**Every mount**

| tool | what it does | credits |
|---|---|---|
| `get_usage` | check credits and recent charges (needs a key) | 0 |

Any tool call can set `freshness: "realtime"` for +2 credits to force a live fetch instead of cached data (needs a key). Full tool reference with schemas: https://veezee.io/docs

## Keyless quickstart

No signup, no card, no key: the calls below work as-is. One example per platform.

LinkedIn — get a person profile:

```json
{
  "method": "tools/call",
  "params": {
    "name": "linkedin_get_profile",
    "arguments": { "identifier": "williamhgates" }
  }
}
```

Reddit — search comments for what people say about a product:

```json
{
  "method": "tools/call",
  "params": {
    "name": "reddit_search",
    "arguments": { "query": "notion alternative", "type": "comments" }
  }
}
```

X, formerly Twitter — get a profile:

```json
{
  "method": "tools/call",
  "params": {
    "name": "x_get_profile",
    "arguments": { "identifier": "nasa" }
  }
}
```

## Install

Examples below use `/all`; swap in `/linkedin`, `/reddit`, or `/x` for a single-platform mount.

Claude Code:

```
claude mcp add --transport http veezee https://mcp.veezee.io/all
```

Codex CLI:

```
codex mcp add veezee --url https://mcp.veezee.io/all
```

Cursor (`.cursor/mcp.json` or `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "veezee": { "url": "https://mcp.veezee.io/all" }
  }
}
```

VS Code (`.vscode/mcp.json`):

```json
{
  "servers": {
    "veezee": { "type": "http", "url": "https://mcp.veezee.io/all" }
  }
}
```

claude.ai: Settings > Connectors > Add custom connector > `https://mcp.veezee.io/all` (or a single-platform mount).

More clients (Windsurf, Cline, Zed, plain REST), each snippet verified against the client's official docs: https://veezee.io/docs/clients

## REST twin

Every tool has a REST route with identical semantics at `https://api.veezee.io` (contract: https://veezee.io/openapi.json). A typed TypeScript SDK and CLI ship as [`@veezee/sdk`](https://www.npmjs.com/package/@veezee/sdk) (docs: https://veezee.io/docs/sdk).

## Links

- Agent setup guide: https://veezee.io/agent-setup/prompt.md
- Operating rules for agents: https://veezee.io/AGENTS.md
- Pricing: https://veezee.io/pricing
- What we store and how keys are handled: https://veezee.io/trust
- Skills packs: https://github.com/veezeehq/veezee-skills
