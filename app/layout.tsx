import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { JsonLd } from '@/components/JsonLd'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://acelabador.vercel.app'),
  title: {
    default: 'Ace Labador | Software Developer ',
    template: '%s | Ace Labador',
  },
  description:
    'Ace Labador - Certified Software Engineer & Full-Stack Developer based in Meycauayan, Bulacan, Philippines. 4+ years of experience in React, Next.js, TypeScript, Node.js. Hire a freelance developer for web development projects. Certified by IBM, Google, Meta, Amazon, and GitHub.',
  keywords: [
    'Ace Labador',
    'software developer Philippines',
    'freelance developer Meycauayan',
    'freelance developer Bulacan',
    'web developer Philippines',
    'React developer Philippines',
    'Next.js developer',
    'full-stack developer Bulacan',
    'hire Filipino developer',
    'software engineer Philippines',
    'frontend developer Philippines',
    'backend developer Philippines',
    'TypeScript developer',
    'Node.js developer Philippines',
    'freelance web developer',
    'Meycauayan developer',
    'Bulacan software engineer',
  ],
  authors: [{ name: 'Ace Labador', url: 'https://acelabador.vercel.app' }],
  creator: 'Ace Labador',
  publisher: 'Ace Labador',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://acelabador.vercel.app',
    title: 'Ace Labador | Software Developer Philippines',
    description:
      'Certified Software Engineer & Full-Stack Developer based in Meycauayan, Bulacan, Philippines. 4+ years of experience in React, Next.js, TypeScript, Node.js. Open to freelance and full-time opportunities.',
    siteName: 'Ace Labador Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ace Labador - Software Developer Philippines',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ace Labador | Software Developer Philippines',
    description:
      'Certified Software Engineer & Full-Stack Developer based in Meycauayan, Bulacan, Philippines. 4+ years of experience in React, Next.js, TypeScript, Node.js.',
    images: ['/images/og-image.png'],
    creator: '@ac3labador',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'OBwTnzCJhtTRTGjraMYwzcyuh6-Q9XyE-bb0rxaAzOw',
  },
  alternates: {
    canonical: 'https://acelabador.vercel.app',
  },
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning
      >
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
