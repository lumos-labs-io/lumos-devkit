import type { NextApiRequest, NextApiResponse } from "next";
const RECEIVER = process.env.NEXT_PUBLIC_LUMOS_RECEIVER || "";
const RPC = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { tx, amount, memo } = req.body || {};
  if (!tx || !amount) return res.status(400).json({ ok:false, error:"tx and amount required" });

  const r = await fetch(RPC,{
    method:"POST",
    headers:{ "content-type":"application/json" },
    body: JSON.stringify({ jsonrpc:"2.0", id:1, method:"getParsedTransaction", params:[tx, { maxSupportedTransactionVersion:0 }] })
  });
  const j = await r.json();
  const info = j.result;
  if (!info) return res.status(400).json({ ok:false, error:"TX not found" });

  let paidOk = false, memoOk = !memo;
  for (const ix of info.transaction.message.instructions || []) {
    const p = (ix as any).parsed;
    if (p?.type === "transfer" && p.info?.destination === RECEIVER) {
      const sol = Number(p.info?.lamports || 0) / 1e9;
      if (sol + 1e-9 >= Number(amount)) paidOk = true;
    }
    if (p?.type === "memo") if (p.info?.memo === memo) memoOk = true;
  }

  if (!(paidOk && memoOk)) return res.status(400).json({ ok:false, error:"Payment mismatch" });
  return res.status(200).json({ ok:true });
}
