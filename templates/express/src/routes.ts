import { Router } from "express";
import fetch from "node-fetch";
export const router = Router();

const RECEIVER = process.env.LUMOS_RECEIVER || "HWAyopVZUZkboNQEkKMNpYa4oUU8vR9eT59UMqzjLe7x";
const RPC = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";

router.get("/article", (req, res) => {
  const paid = req.header("x-lumos-paid") === "true";
  if (!paid) return res.status(402).json({ protocol:"x402", chain:"solana", amount:"0.01", memo:"article_42" });
  return res.json({ ok:true, content:"Unlocked content payload" });
});

router.post("/verify", async (req, res) => {
  const { tx, amount, memo } = req.body || {};
  if (!tx || !amount) return res.status(400).json({ ok:false, error:"tx and amount required" });

  const r = await fetch(RPC, {
    method:"POST",
    headers:{ "content-type":"application/json" },
    body: JSON.stringify({ jsonrpc:"2.0", id:1, method:"getParsedTransaction", params:[tx, { maxSupportedTransactionVersion:0 }] })
  });
  const j: any = await r.json();
  const info = j.result;
  if (!info) return res.status(400).json({ ok:false, error:"TX not found" });

  let paidOk = false, memoOk = !memo;
  for (const ix of info.transaction.message.instructions || []) {
    const p = (ix as any).parsed;
    if (p?.type === "transfer" && p.info?.destination === RECEIVER) {
      const sol = Number(p.info?.lamports || 0)/1e9;
      if (sol + 1e-9 >= Number(amount)) paidOk = true;
    }
    if (p?.type === "memo") if (p.info?.memo === memo) memoOk = true;
  }
  if (!(paidOk && memoOk)) return res.status(400).json({ ok:false, error:"Payment mismatch" });
  return res.json({ ok:true });
});
