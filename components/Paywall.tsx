"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { Lumos } from "@lumos/sdk";
import { useState } from "react";

export default function Paywall() {
  const { publicKey, signTransaction } = useWallet();
  const [status, setStatus] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  async function run() {
    try {
      if (!publicKey || !signTransaction) { setStatus("Connect wallet"); return; }
      setStatus("Processing…");
      const res = await Lumos.payVerifyUnlock({
        endpoint: "/api/article?id=42",
        cfg: { apiBase: "/api", receiver: process.env.NEXT_PUBLIC_LUMOS_RECEIVER! },
        wallet: { publicKey, signTransaction } as any
      });
      if (res.ok) setUnlocked(true);
      setStatus("✅ Unlocked");
    } catch (e:any) {
      setStatus(`❌ ${e.message || "Failed"}`);
    }
  }

  if (unlocked) return <div className="text-amber-400 text-lg">✨ Unlocked by Lumos</div>;

  return (
    <div className="text-center">
      <button
        onClick={run}
        className="px-6 py-3 rounded-xl font-semibold text-black"
        style={{ background: "linear-gradient(135deg,#FF993A,#B84E00)" }}
      >
        Pay & Unlock
      </button>
      <p className="text-sm text-neutral-400 mt-3">{status}</p>
    </div>
  );
}
