import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const paid = req.headers["x-lumos-paid"] === "true";
  if (!paid) {
    return res.status(402).json({
      protocol: "x402",
      chain: "solana",
      amount: "0.01",
      memo: "article_42"
    });
  }
  return res.status(200).json({ ok: true, content: "Unlocked content payload" });
}
