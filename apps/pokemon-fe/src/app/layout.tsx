import { Manrope } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { createTheme, MantineProvider, ColorSchemeScript } from '@mantine/core';

import { StoreProvider } from './StoreProvider';
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
        <MantineProvider theme={theme}>
          <StoreProvider>{children}</StoreProvider>
        </MantineProvider>
      </body>
      <GoogleAnalytics gaId="G-DYHHK7EQ42" />
    </html>
  );
}
