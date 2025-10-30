import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { txBase64 } = req.body || {};
  if (!txBase64) return res.status(400).json({ error: "txBase64 required" });

  const RPC = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
  const body = { jsonrpc:"2.0", id:1, method:"sendRawTransaction", params:[txBase64, { skipPreflight:false, preflightCommitment:"confirmed" }] };
  const r = await fetch(RPC,{ method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify(body) });
  const j = await r.json();
  if (j.error) return res.status(400).json({ error: j.error });
  res.status(200).json({ signature: j.result });
}
