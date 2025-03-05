import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Sidebar from '@/components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chavaudra Nathan - Portfolio',
  description: 'Developpeur Full-stack',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-[280px] p-8 md:p-12 overflow-auto">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}