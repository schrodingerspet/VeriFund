import './globals.css';
import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'VeriFund — Blockchain Charity Platform',
  description: 'Decentralized charity donations on Ethereum. Transparent, verified, direct.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-bg">
          <Navigation />
          <main className="relative z-[1]">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}