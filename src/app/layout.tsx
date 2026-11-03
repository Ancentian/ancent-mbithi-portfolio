import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MotionProvider } from '@/components/ui/MotionProvider';
import { profile, seo } from '@/data/site';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: seo.title, template: `%s | ${profile.name}` },
  description: seo.description,
  applicationName: profile.name,
  keywords: seo.keywords,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  category: 'technology',
  alternates: { canonical: '/' },
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'profile',
    firstName: 'Ancent',
    lastName: 'Mbithi',
    title: seo.title,
    description: seo.description,
    url: '/',
    siteName: profile.name,
    locale: 'en_KE',
  },
  twitter: { card: 'summary_large_image', title: seo.title, description: seo.description },
};

export const viewport: Viewport = {
  themeColor: '#081d4d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE" className={jakarta.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <MotionProvider>
          {children}
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
