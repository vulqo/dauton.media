import type { Metadata } from 'next';
import './globals.css';
import NavWrapper from '@/components/NavWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Dauton Media — Archive of Spanish-language rap',
  description: 'Archive, discovery, and editorial. Spanish-language rap with focus on the Venezuelan scene.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="dauton-base">
        <NavWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
