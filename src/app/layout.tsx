import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../assets/styles/globals.css';
import { APP_NAME, SERVER_URL } from '../lib/constants';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: 'A modern built-in AI store',
  metadataBase: new URL(SERVER_URL || 'http://localhost:4000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
