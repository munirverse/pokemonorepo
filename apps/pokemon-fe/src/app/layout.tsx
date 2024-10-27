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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
