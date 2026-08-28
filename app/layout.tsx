import type {Metadata} from 'next';
import { Roboto } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css'; // Global styles
import AIChatAssistant from '@/components/AIChatAssistant';
import TopProgressBar from '@/components/TopProgressBar';
import Footer from '@/components/Footer';

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ELIMI Boutique & Services',
  description: 'Curated e-commerce boutique & verified professional services platform in Burundi.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-slate-50 text-slate-900">
        <Suspense fallback={null}>
          <TopProgressBar />
        </Suspense>
        {children}
        <Footer />
        <AIChatAssistant />
      </body>
    </html>
  );
}

