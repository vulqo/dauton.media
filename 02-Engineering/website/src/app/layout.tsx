import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dauton Media — Archivo del rap hispanohablante',
  description: 'Archivo, discovery y editorial. Rap hispanohablante con enfoque en la escena venezolana.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="dauton-base">{children}</body>
    </html>
  );
}
