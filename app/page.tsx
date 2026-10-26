'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart, Shield, Zap, Users, TrendingUp, ExternalLink,
  ArrowUpRight, CheckCircle2, Sparkles,
} from 'lucide-react';
import { CharityCard } from '@/components/CharityCard';
import { ApiService, Charity } from '@/lib/api';
import { useWeb3 } from '@/hooks/useWeb3';

/* ─── Animated Counter (instant render, smooth count-up on data load) ─── */
function AnimatedNumber({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (value === 0) {
      setDisplay(0);
      return;
    }
    const start = performance.now();
    const startVal = display;
    const dur = 1000;
    let rafId: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(parseFloat((startVal + (value - startVal) * eased).toFixed(decimals)));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value, decimals]);

  return (
    <span className="tabular-nums">
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Plus Icon ─── */
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN LANDING PAGE
════════════════════════════════════════════════════════════ */
export default function Home() {
  const [featuredCharities, setFeaturedCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalCharities: 0, totalDonations: 0, totalAmount: 0 });
  const { account, userProfile } = useWeb3();

  useEffect(() => {
    const loadData = async () => {
      try {
        const charities = await ApiService.getCharities();
        const approved = charities.filter((c) => c.status === 'approved');
        setFeaturedCharities(approved.slice(0, 3));
        setStats({
          totalCharities: approved.length,
          totalDonations: approved.reduce((s, c) => s + (Number(c.raisedAmount) > 0 ? 1 : 0), 0),
          totalAmount:    approved.reduce((s, c) => s + Number(c.raisedAmount), 0),
        });
      } catch (e) {
        console.error('Failed to load charities:', e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const FEATURES = [
    {
      icon: Shield,
      iconCls: 'text-indigo-600',
      bg: 'bg-indigo-500/10',
      hoverBorder: 'hover:border-indigo-300/70',
      title: 'Verified Charities',
      desc: 'All charities undergo rigorous KYC verification with government ID and official approval documents before listing.',
    },
    {
      icon: Zap,
      iconCls: 'text-amber-500',
      bg: 'bg-amber-400/10',
      hoverBorder: 'hover:border-amber-300/70',
      title: 'Blockchain Transparency',
      desc: 'Every donation is recorded immutably on the Ethereum blockchain, ensuring full traceability and zero tampering.',
    },
    {
      icon: Heart,
      iconCls: 'text-rose-500',
      bg: 'bg-rose-400/10',
      hoverBorder: 'hover:border-rose-300/70',
      title: 'Direct Impact',
      desc: 'Your donations go directly to charity smart contracts and wallets without middlemen, maximizing every wei of impact.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 space-y-12 md:space-y-16 pb-16">

      {/* ══════════════════════════════════════════════
          1. HERO SECTION (Unboxed, Direct on Ambient Background)
      ══════════════════════════════════════════════ */}
      <section className="pt-4 sm:pt-8 md:pt-10 text-center">

        {/* Small Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                        bg-indigo-500/10 border border-indigo-400/25 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" strokeWidth={2} />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Powered by Ethereum Blockchain
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight
                       leading-[1.08] text-slate-900 mb-6 max-w-4xl mx-auto">
          Transparent Charity,{' '}
          <span className="gradient-text">Built on Blockchain</span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          Donate with confidence using Ethereum. Every transaction is transparent,
          secure, and immutably recorded. Help verified charities make a real difference.
        </p>

        {/* Primary & Secondary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
          <Link href="/charities">
            <button className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm
                               bg-gradient-to-br from-indigo-600 to-violet-600 text-white
                               shadow-[0_4px_20px_rgba(79,70,229,0.35)]
                               hover:shadow-[0_6px_28px_rgba(79,70,229,0.45)] hover:-translate-y-0.5
                               active:scale-[0.98]
                               transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <Heart className="w-4 h-4" strokeWidth={2.5} />
              Start Donating
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center
                               group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110
                               transition-transform duration-300">
                <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
              </span>
            </button>
          </Link>

          <Link href="/charities">
            <button className="flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm
                               glass text-slate-700 hover:bg-white/80 hover:-translate-y-0.5
                               active:scale-[0.98]
                               transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
              Explore Charities
            </button>
          </Link>

          {/* Charity creator action */}
          {account && userProfile?.profileType === 'charity' && (
            <Link href="/create-charity">
              <button className="flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm
                                 bg-emerald-500/10 border border-emerald-400/30 text-emerald-700
                                 hover:bg-emerald-500/20 hover:-translate-y-0.5 active:scale-[0.98]
                                 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <PlusIcon className="w-4 h-4" />
                Create Charity
              </button>
            </Link>
          )}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {['KYC Verified Charities', 'On-Chain Transparency', '0% Platform Fee'].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2.5} />
              <span className="text-xs sm:text-sm font-medium text-slate-500">{badge}</span>
            </div>
          ))}
        </div>

        {/* ── 3 LIVE STATS CARDS (Integrated directly below buttons, tight mt-10) ── */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              icon: Users,
              iconCls: 'text-indigo-600',
              bg: 'bg-indigo-500/10',
              val: stats.totalCharities,
              label: 'Verified Charities',
              suffix: '',
              decimals: 0,
            },
            {
              icon: TrendingUp,
              iconCls: 'text-emerald-600',
              bg: 'bg-emerald-500/10',
              val: stats.totalAmount,
              label: 'Total Donated',
              suffix: ' ETH',
              decimals: 4,
            },
            {
              icon: Heart,
              iconCls: 'text-rose-500',
              bg: 'bg-rose-400/10',
              val: stats.totalDonations,
              label: 'Active Campaigns',
              suffix: '',
              decimals: 0,
            },
          ].map(({ icon: Icon, iconCls, bg, val, label, suffix, decimals }) => (
            <div
              key={label}
              className="glass rounded-2xl p-6 flex items-center gap-5
                         hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] hover:-translate-y-0.5
                         transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <div className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-6 h-6 ${iconCls}`} strokeWidth={2} />
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight text-slate-900 leading-none mb-1">
                  <AnimatedNumber value={val} decimals={decimals} suffix={suffix} />
                </p>
                <p className="text-sm font-medium text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. "WHY CHOOSE CHARIBLOCK" FEATURE GRID
      ══════════════════════════════════════════════ */}
      <section className="pt-2">
        {/* Clean Text Header (No Box Wrapper) */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                          bg-violet-500/10 border border-violet-400/25 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
              Why VeriFund
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Built for trust, transparency &amp; real impact
              </h2>
              <p className="text-slate-500 mt-2 text-base leading-relaxed">
                Our platform ensures transparency, security, and trust in every donation.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Feature Cards in 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, iconCls, bg, hoverBorder, title, desc }) => (
            <div
              key={title}
              className={`glass ${hoverBorder} rounded-2xl p-7
                          hover:shadow-[0_12px_36px_rgba(79,70,229,0.12)] hover:-translate-y-1
                          transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-default`}
            >
              <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-5`}>
                <Icon className={`w-7 h-7 ${iconCls}`} strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. FEATURED CHARITIES SECTION
      ══════════════════════════════════════════════ */}
      {featuredCharities.length > 0 && (
        <section className="pt-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                              bg-emerald-500/10 border border-emerald-400/25 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                  Live on Chain
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Featured Charities
              </h2>
              <p className="text-slate-500 text-sm mt-1">Support verified charities making a difference</p>
            </div>
            <Link href="/charities">
              <button className="group flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
                                 glass text-slate-600 hover:bg-white/80 hover:-translate-y-0.5
                                 active:scale-[0.98]
                                 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                View All
                <span className="w-5 h-5 rounded-full bg-slate-200/70 flex items-center justify-center
                                 group-hover:translate-x-0.5 group-hover:-translate-y-px
                                 transition-transform duration-300">
                  <ExternalLink className="w-2.5 h-2.5" strokeWidth={2.5} />
                </span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCharities.map((charity) => (
              <CharityCard key={charity.id} charity={charity} />
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          4. CALL TO ACTION BANNER
      ══════════════════════════════════════════════ */}
      <section className="pt-2">
        <div className="glass-strong rounded-3xl px-8 sm:px-14 py-12 md:py-16 text-center relative overflow-hidden">
          {/* Subtle top edge highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-violet-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                          bg-indigo-500/10 border border-indigo-400/25 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">
              Get Started
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Ready to Make a <span className="gradient-text">Difference?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
            Join our community of donors and charity creators building a more
            transparent future for charitable giving — one block at a time.
          </p>

          {!account ? (
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-slate-500">Connect your MetaMask wallet to get started</p>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                               bg-amber-400/10 border border-amber-400/30 text-amber-700 text-xs font-bold">
                🦊 MetaMask Required
              </span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <Link href="/charities">
                <button className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm
                                   bg-gradient-to-br from-indigo-600 to-violet-600 text-white
                                   shadow-[0_4px_20px_rgba(79,70,229,0.35)]
                                   hover:shadow-[0_6px_28px_rgba(79,70,229,0.45)] hover:-translate-y-0.5
                                   active:scale-[0.98]
                                   transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  Explore Charities
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center
                                   group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110
                                   transition-transform duration-300">
                    <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
                  </span>
                </button>
              </Link>
              {userProfile?.profileType === 'charity' && (
                <Link href="/create-charity">
                  <button className="flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm
                                     glass text-slate-700 hover:bg-white/80 hover:-translate-y-0.5
                                     active:scale-[0.98]
                                     transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    Create Your Charity
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}