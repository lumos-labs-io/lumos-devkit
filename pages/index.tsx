import LumosWalletProvider from "@/components/LumosWalletProvider";
import dynamic from "next/dynamic";
const Paywall = dynamic(() => import("@/components/Paywall"), { ssr: false });

export default function Home() {
  return (
    <LumosWalletProvider>
      <main style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{border:"1px solid #222",borderRadius:16,padding:24,textAlign:"center",maxWidth:480}}>
          <h1 style={{fontSize:28,marginBottom:8}}>LUMOS — Paywall Demo</h1>
          <p style={{opacity:.7,marginBottom:24}}>Pay → Verify → Unlock (x402 on Solana)</p>
          <Paywall/>
        </div>
      </main>
    </LumosWalletProvider>
  );
}
