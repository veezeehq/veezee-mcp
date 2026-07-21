#!/usr/bin/env node
// Stdio proxy to the hosted Veezee MCP server (https://mcp.veezee.io).
// Mints a free trial key when VEEZEE_API_KEY is not set, so headless clients
// work with zero setup. Set VEEZEE_API_KEY to reuse one key across runs.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

let key = process.env.VEEZEE_API_KEY;
if (!key) {
  const res = await fetch("https://api.veezee.io/v1/keys/mint", { method: "POST" });
  if (!res.ok) {
    console.error(`veezee-mcp: key mint failed (${res.status}): ${await res.text()}`);
    process.exit(1);
  }
  ({ key } = await res.json());
  console.error("veezee-mcp: minted a free trial key (200 credits/day); set VEEZEE_API_KEY to reuse a key across runs");
}

const url = process.env.VEEZEE_MCP_URL ?? "https://mcp.veezee.io/all";
const require = createRequire(import.meta.url);
let proxy = null;
try {
  proxy = require.resolve("mcp-remote/dist/proxy.js");
} catch {}
const [cmd, baseArgs] = proxy ? [process.execPath, [proxy]] : ["npx", ["-y", "mcp-remote"]];
const child = spawn(cmd, [...baseArgs, url, "--transport", "http-only", "--header", `Authorization: Bearer ${key}`], {
  stdio: "inherit",
});
child.on("exit", (code) => process.exit(code ?? 1));
