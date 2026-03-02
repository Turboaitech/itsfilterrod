import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PT. Indonesian Tobacco Special Filter Rod',
  description: 'Leading provider of high-quality filter rods for the tobacco industry',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
