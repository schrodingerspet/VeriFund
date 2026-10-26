'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletConnect } from './WalletConnect';
import { Heart, Plus, LayoutDashboard, Home, TreePine, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navItems = [
    { href: '/',               label: 'Home',          icon: Home },
    { href: '/charities',      label: 'Charities',     icon: Heart },
    { href: '/donations',      label: 'Donations',     icon: TreePine },
    { href: '/create-charity', label: 'Create Charity',icon: Plus },
    { href: '/admin',          label: 'Admin',         icon: LayoutDashboard },
  ];

  return (
    <>
      {/* ── Sticky Floating Glassmorphic Header ── */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-all duration-500',
          'ease-[cubic-bezier(0.32,0.72,0,1)]'
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pt-4">
          <nav
            className={cn(
              'flex items-center justify-between px-6 sm:px-8 h-16 rounded-2xl glass-nav',
              'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
              scrolled && 'shadow-[0_8px_32px_rgba(79,70,229,0.12)]'
            )}
          >
            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group shrink-0"
            >
              {/* Outer bezel shell */}
              <div className="p-1 rounded-xl bg-slate-100/80 border border-slate-200/60">
                {/* Inner core */}
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <Heart className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span
                className="text-base font-bold tracking-tight text-slate-900 group-hover:text-indigo-600
                           transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                VeriFund
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
                      'transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 shadow-[inset_0_1px_2px_rgba(79,70,229,0.08)]'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
                    )}
                  >
                    <item.icon
                      className={cn('w-3.5 h-3.5 shrink-0', isActive ? 'text-indigo-600' : '')}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* ── Right Side: Wallet + Mobile Hamburger ── */}
            <div className="flex items-center gap-2">
              <WalletConnect />

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                className="md:hidden relative w-8 h-8 flex items-center justify-center rounded-lg
                           text-slate-500 hover:text-slate-900 hover:bg-slate-100
                           transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                {/* Morphing hamburger → X */}
                <span
                  className={cn(
                    'absolute transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
                    mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-45 scale-75'
                  )}
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </span>
                <span
                  className={cn(
                    'absolute transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
                    mobileOpen ? 'opacity-0 -rotate-45 scale-75' : 'opacity-100 rotate-0 scale-100'
                  )}
                >
                  <Menu className="w-5 h-5" strokeWidth={2} />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        aria-hidden={!mobileOpen}
        className={cn(
          'fixed inset-0 z-30 md:hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          mobileOpen
            ? 'backdrop-blur-2xl bg-white/85 pointer-events-auto opacity-100'
            : 'backdrop-blur-none bg-transparent pointer-events-none opacity-0'
        )}
      >
        <div className="flex flex-col justify-center items-center h-full gap-3 px-6">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{ transitionDelay: mobileOpen ? `${100 + i * 60}ms` : '0ms' }}
                className={cn(
                  'w-full max-w-xs flex items-center gap-3 px-5 py-4 rounded-2xl text-lg font-semibold',
                  'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                  mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
                  isActive
                    ? 'bg-indigo-600 text-white shadow-[0_8px_24px_rgba(79,70,229,0.25)]'
                    : 'bg-white/70 text-slate-700 border border-slate-200/80 hover:bg-indigo-50'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Spacer so content doesn't hide behind sticky nav */}
      <div className="h-20" />
    </>
  );
}