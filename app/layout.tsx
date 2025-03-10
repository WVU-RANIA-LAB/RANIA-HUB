import { ReactNode } from 'react';
import type { Metadata } from 'next';

import './globals.css';
import { inter } from '@/app/ui/ui-utils/fonts';
import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: {
    template: '%s | RANIA Hub',
    default: 'RANIA Hub',
  },
  description: 'RANIA Hub web application',
};

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
