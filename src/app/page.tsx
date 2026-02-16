"use client";

import React, { useMemo, useState } from "react";

type Tab = "create" | "liquidity" | "trade";

function cx(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function clampNum(v: string) {
  const x = v.replace(",", ".").trim();
  if (!x) return "";
  if (!/^\d*\.?\d*$/.test(x)) return "";
  return x;
}

export default function Page() {
  const FIXED_SUPPLY = "1000000000"; // 1B fixed

  const [tab, setTab] = useState<Tab>("create");

  // Create Token form (EMPTY by default)
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  // Liquidity form
  const [quoteSol, setQuoteSol] = useState("1");
  const [baseTokens, setBaseTokens] = useState("500000000");
  const [lpLockDays, setLpLockDays] = useState("7");
  const [confirmRisk, setConfirmRisk] = useState(false);

  const creationFeeSol = 0.01;
  const platformFeeBps = 30;

  const impliedStartPrice = useMemo(() => {
    const sol = Number(quoteSol);
    const tok = Number(baseTokens);
    if (!isFinite(sol) || !isFinite(tok) || sol <= 0 || tok <= 0) return null;
    return sol / tok; // SOL per token
  }, [quoteSol, baseTokens]);

  // f-tx.net style (minimal + black buttons)
  const btn =
    "rounded-xl bg-black hover:bg-white/10 border border-white/10 px-4 py-2 text-sm font-medium transition cursor-pointer";

  const tabBtn = (t: Tab) =>
    cx(
      "px-3 py-2 rounded-xl border text-sm font-medium transition cursor-pointer",
      tab === t
        ? "border-white/20 bg-white/10"
        : "border-white/10 bg-white/5 hover:bg-white/10"
    );

  const input =
    "mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/20";
  const label = "text-sm text-white/70";

  return (
    <main className="min-h-screen bg-[#0b1220] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-2xl md:text-3xl font-semibold tracking-wide">
              FTX2.0 Launchpad
            </div>
            <div className="text-white/70 mt-1 max-w-2xl">
              Secure Launch: creators seed real SOL liquidity. Platform fees are used
              for <span className="text-white">FTX2.0 buyback & burn</span>.
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <a href="https://f-tx.net" className={btn}>
              Back to f-tx.net
            </a>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-8 flex gap-2 flex-wrap">
          <button className={tabBtn("create")} onClick={() => setTab("create")}>
            Create Token
          </button>
          <button className={tabBtn("liquidity")} onClick={() => setTab("liquidity")}>
            Seed Liquidity
          </button>
          <button className={tabBtn("trade")} onClick={() => setTab("trade")}>
            Trade
          </button>
        </div>

        {/* GRID */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
            {tab === "create" && (
              <div>
                <div className="text-lg font-semibold">Create Token</div>
                <div className="mt-1 text-sm text-white/70">
                  Supply is fixed at{" "}
                  <span className="text-white font-semibold">1,000,000,000</span>. Creation fee:{" "}
                  <span className="text-white font-semibold">{creationFeeSol} SOL</span>.
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <div className={label}>Name</div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={input}
                      placeholder="Token name"
                    />
                  </label>

                  <label className="block">
                    <div className={label}>Symbol</div>
                    <input
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value.toUpperCase().slice(0, 10))}
                      className={input}
                      placeholder="TICKER"
                    />
                  </label>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs text-white/50">Decimals</div>
                    <div className="mt-1 text-sm">
                      <span className="font-semibold">6</span>{" "}
                      <span className="text-white/60">(fixed)</span>
                    </div>
                    <div className="mt-3 text-xs text-white/50">Total Supply</div>
                    <div className="mt-1 text-sm">
                      <span className="font-semibold">{FIXED_SUPPLY}</span>{" "}
                      <span className="text-white/60">(fixed)</span>
                    </div>
                  </div>

                  <label className="block md:col-span-2">
                    <div className={label}>Image URL</div>
                    <input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className={input}
                      placeholder="https://..."
                    />
                    <div className="mt-2 text-xs text-white/50">
                      Optional. You can add this later too.
                    </div>
                  </label>

                  <label className="block md:col-span-2">
                    <div className={label}>Description</div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className={cx(input, "resize-none")}
                      placeholder="One-liner + what makes it different."
                    />
                  </label>
                </div>

                <div className="mt-6 flex gap-2 flex-wrap">
                  <button className={cx(btn, "opacity-60 cursor-not-allowed")} disabled>
                    Create (wire tx next)
                  </button>
                  <button className={btn} onClick={() => setTab("liquidity")}>
                    Next → Seed Liquidity
                  </button>
                </div>
              </div>
            )}

            {tab === "liquidity" && (
              <div>
                <div className="text-lg font-semibold">Seed Liquidity</div>
                <div className="mt-1 text-sm text-white/70">
                  Anti-rug step: creator seeds real SOL liquidity. If they won’t, they don’t believe.
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <div className={label}>Initial SOL</div>
                    <input
                      value={quoteSol}
                      onChange={(e) => setQuoteSol(clampNum(e.target.value))}
                      className={input}
                      placeholder="1"
                    />
                  </label>

                  <label className="block">
                    <div className={label}>Tokens to pair in LP</div>
                    <input
                      value={baseTokens}
                      onChange={(e) => setBaseTokens(clampNum(e.target.value))}
                      className={input}
                      placeholder="500000000"
                    />
                  </label>

                  <label className="block">
                    <div className={label}>LP lock (days)</div>
                    <input
                      value={lpLockDays}
                      onChange={(e) => setLpLockDays(clampNum(e.target.value))}
                      className={input}
                      placeholder="7"
                    />
                  </label>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs text-white/50">Implied start</div>
                    <div className="mt-1 text-sm">
                      {impliedStartPrice === null ? (
                        <span className="text-white/60">—</span>
                      ) : (
                        <>
                          <span className="font-semibold">{impliedStartPrice.toExponential(4)}</span>{" "}
                          <span className="text-white/70">SOL / token</span>
                        </>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-white/50">
                      Preview only. Real price is market-discovered.
                    </div>
                  </div>

                  <label className="md:col-span-2 flex items-start gap-3 mt-2">
                    <input
                      type="checkbox"
                      checked={confirmRisk}
                      onChange={(e) => setConfirmRisk(e.target.checked)}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="text-sm text-white/70">
                      I understand I’m seeding real SOL liquidity on a public pool. I accept the risks.
                    </div>
                  </label>
                </div>

                <div className="mt-6 flex gap-2 flex-wrap">
                  <button
                    className={cx(btn, !confirmRisk && "opacity-60 cursor-not-allowed")}
                    disabled={!confirmRisk}
                  >
                    Create Raydium Pool (wire next)
                  </button>
                  <button className={btn} onClick={() => setTab("trade")}>
                    Next → Trade
                  </button>
                </div>
              </div>
            )}

            {tab === "trade" && (
              <div>
                <div className="text-lg font-semibold">Trade</div>
                <div className="mt-1 text-sm text-white/70">
                  Swaps routed via Jupiter. Platform fee:{" "}
                  <span className="text-white font-semibold">{platformFeeBps} bps</span>.
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="font-semibold">Swap</div>
                    <div className="mt-2 text-sm text-white/70">
                      Next: embed Jupiter swap for the launched token + show fee transparently.
                    </div>
                    <button className={cx(btn, "mt-4 opacity-60 cursor-not-allowed")} disabled>
                      Open Swap (wire next)
                    </button>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="font-semibold">Buyback & Burn</div>
                    <div className="mt-2 text-sm text-white/70">
                      Fees are used to buy FTX2.0 and burn it. Fully on-chain verifiable.
                    </div>
                    <div className="mt-4 text-xs text-white/50">
                      Next: show last buyback tx + total burned.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PREVIEW */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60">Preview</div>
            <div className="mt-2 text-lg font-semibold">{name || "—"}</div>
            <div className="text-white/70 text-sm">
              {symbol ? `$${symbol}` : "—"} · supply 1,000,000,000 · decimals 6
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs text-white/50">Description</div>
              <div className="mt-2 text-sm text-white/80 whitespace-pre-wrap">
                {description || "—"}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs text-white/50">Image</div>
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="token"
                  className="mt-2 w-full rounded-xl border border-white/10 object-cover"
                />
              ) : (
                <div className="mt-2 text-sm text-white/60">—</div>
              )}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs text-white/50">Note</div>
              <div className="mt-2 text-sm text-white/70">
                This launchpad requires real SOL liquidity. That’s the filter.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-white/40">
          UI-only MVP. Next: wallet + on-chain flows.
        </div>
      </div>
    </main>
  );
}

