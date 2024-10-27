import './global.scss';
import { Manrope } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata = {
  title: 'Pokemonorepo',
  description: 'A full-stack portfolio project using Nx, NestJS, and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body>{children}</body>
    </html>
  );
}
