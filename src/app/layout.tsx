import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'JDR Golden Heights | Premium Residential Community near Yadadri, Telangana',
  description:
    'Own a premium plotted development at JDR Golden Heights, near Yadadri, Telangana. High appreciation potential, clear legal titles, modern amenities, and world-class infrastructure. Starting at ₹18 Lakhs.',
  keywords: [
    'JDR Golden Heights',
    'Plots Near Yadadri',
    'Open Plots in Yadadri',
    'DTCP Plots Near Yadadri',
    'Real Estate Investment Yadadri',
    'Premium Residential Community Telangana',
    'Yadadri Open Plots',
    'JDR Goldencity Constructions',
    'Hyderabad real estate',
  ],
  authors: [{ name: 'JDR Goldencity Constructions Pvt. Ltd.' }],
  robots: 'index, follow',
  openGraph: {
    title: 'JDR Golden Heights | Premium Plots near Yadadri',
    description:
      'Premium gated community plots starting at ₹18 Lakhs. High growth investment corridor near Yadadri temple. Developed by JDR Goldencity Constructions Pvt. Ltd.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://jdrgoldenheights.com',
    siteName: 'JDR Golden Heights',
    images: [
      {
        url: 'https://jdrgoldenheights.com/images/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'JDR Golden Heights Plotted Development Project Near Yadadri',
      },
    ],
  },
  alternates: {
    canonical: 'https://jdrgoldenheights.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org structured data JSON-LD markup
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://jdrgoldenheights.com/#agent',
        'name': 'JDR Goldencity Constructions Private Limited',
        'telephone': '+91 6262838353',
        'email': 'msunilvijaykar@gmail.com',
        'url': 'https://jdrgoldenheights.com',
        'image': 'https://jdrgoldenheights.com/images/logo.png',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '4th Floor, Plot No. 134, Ved Arcade, Snehapuri Colony, Habsiguda',
          'addressLocality': 'Hyderabad',
          'addressRegion': 'Telangana',
          'postalCode': '500076',
          'addressCountry': 'IN',
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://jdrgoldenheights.com/#business',
        'name': 'JDR Golden Heights Office',
        'telephone': '+91 6262838353',
        'priceRange': '₹₹',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '4th Floor, Plot No. 134, Ved Arcade, Snehapuri Colony, Habsiguda',
          'addressLocality': 'Hyderabad',
          'addressRegion': 'Telangana',
          'postalCode': '500076',
          'addressCountry': 'IN',
        },
      },
      {
        '@type': 'Residence',
        '@id': 'https://jdrgoldenheights.com/#project',
        'name': 'JDR Golden Heights Project Site',
        'description':
          'Premium plotted residential community project near Yadadri, Telangana. Offered by JDR Goldencity Constructions Pvt. Ltd. Plots starting at 18 Lakhs.',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Yadadri',
          'addressRegion': 'Telangana',
          'addressCountry': 'IN',
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-luxury-black text-gray-100 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
