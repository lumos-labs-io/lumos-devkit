# Lumos DevKit ☀️

Scaffold ready-to-run Lumos projects with one command.

## Usage
```bash
npm install -g lumos-devkit
create-lumos-app my-lumos --template next
# or
create-lumos-app my-api --template express
# or
create-lumos-app my-landing --template static
```
## Templates

- next: Full Next.js x402 paywall flow (Pay → Verify → Unlock).
- express: Minimal Node/Express backend with verification endpoints.
- static: Plain HTML starter.

## Env

**For Next/Express:**
```ini
RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_LUMOS_RECEIVER=YOUR_SOLANA_WALLET
```
## License
MIT © Lumos Labs
