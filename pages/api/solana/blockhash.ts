import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const RPC = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
  const body = { jsonrpc:"2.0", id:1, method:"getLatestBlockhash", params:[{ commitment:"confirmed" }] };
  const r = await fetch(RPC,{ method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify(body) });
  const j = await r.json();
  if (!j?.result?.value?.blockhash) return res.status(500).json({ error: "RPC error" });
  res.status(200).json(j.result.value);
}
