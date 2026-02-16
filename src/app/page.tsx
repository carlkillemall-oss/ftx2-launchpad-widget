"use client";

import React, { useEffect, useState } from "react";

export default function Page() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#0b1220] text-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-2xl md:text-3xl font-semibold tracking-wide">
              FTX2.0 Launchpad
            </div>
            <div className="text-white/70 mt-1">
              Secure Launch: creators seed real SOL liquidity. Fees buy & burn FTX2.0.
            </div>
          </div>

          <a
            href="https://f-tx.net"
            className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 text-sm font-medium transition cursor-pointer"
          >
            Back to f-tx.net
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-white/60">Step 1</div>
            <div className="mt-1 font-semibold">Create Token</div>
            <div className="mt-2 text-sm text-white/70">
              Mint SPL + metadata. Creation fee: <span className="font-semibold">0.01 SOL</span>.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-white/60">Step 2</div>
</div>
          <div className="mt-1 font-semibold">Seed Liquidity</div>
            <div className="mt-2 text-sm text-white/70">
              Launch directly on Raydium with real SOL liquidity from the creator.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-white/60">Step 3</div>
            <div className="mt-1 font-semibold">Trade (with fees)</div>
            <div className="mt-2 text-sm text-white/70">
              Swaps routed via Jupiter with a platform fee → buyback & burn engine.
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Widget status</div>
          <div className="mt-2 text-sm text-white/70">
            {ready ? "✅ Running. Next: connect wallet + create token flow." : "Loading..."}
          </div>
        </div>
      </div>
    </main>
  );
}

