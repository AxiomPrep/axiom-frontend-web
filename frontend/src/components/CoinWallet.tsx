'use client'

import React, { useEffect, useState } from 'react'
import { getCoins, type CoinWallet as CoinWalletType } from '@/lib/api'
import { Coins } from 'lucide-react'

export default function CoinWallet() {
  const [wallet, setWallet] = useState<CoinWalletType | null>(null)

  useEffect(() => {
    let mounted = true
    getCoins().then((w) => {
      if (mounted) setWallet(w)
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="flex items-center gap-2.5 rounded-2xl border border-yellow-500/25 bg-neutral-900/60 px-4 py-2.5 backdrop-blur-md">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-yellow-400 to-amber-600 text-neutral-950 shadow-inner">
          <Coins className="h-4 w-4" />
        </span>
        <div className="text-left">
          <div className="text-[10px] font-bold uppercase tracking-wider text-yellow-400/80">Gold Coins</div>
          <div className="font-mono text-lg font-black text-white">
            {wallet ? wallet.gold.toLocaleString() : '—'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-300/20 bg-neutral-900/60 px-4 py-2.5 backdrop-blur-md">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-slate-200 to-slate-400 text-neutral-950 shadow-inner">
          <Coins className="h-4 w-4" />
        </span>
        <div className="text-left">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300/80">Silver Coins</div>
          <div className="font-mono text-lg font-black text-white">
            {wallet ? wallet.silver.toLocaleString() : '—'}
          </div>
        </div>
      </div>
    </div>
  )
}
