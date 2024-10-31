import { Manrope } from 'next/font/google';
import { createTheme, MantineProvider, ColorSchemeScript } from '@mantine/core';

import './global.scss';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata = {
  title: 'Pokemonorepo',
  description: 'A full-stack portfolio project using Nx, NestJS, and Next.js',
};

const theme = createTheme({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <head>
        <ColorSchemeScript
          defaultColorScheme={'light'}
          forceColorScheme={'light'}
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
