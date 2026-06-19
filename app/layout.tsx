import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
});

export const viewport = {
  themeColor: "#0b0c18",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://www.growbusinessbd.com"),
  title: {
    default: "Grow Business Solutions | Premium Web Development Agency",
    template: "%s | Grow Business Solutions",
  },
  description:
    "Building scalable networks and technical excellence for global business expansion. Expert web development, MERN stack, and digital solutions with a focus on speed and performance.",
  keywords: [
    "web development agency",
    "MERN stack development",
    "Next.js 16 expert",
    "React 19 development",
    "business automation",
    "custom software solutions",
    "digital transformation",
    "Bangladesh tech agency",
  ],
  authors: [{ name: "Grow Business Solutions" }],
  creator: "Grow Business Solutions",
  publisher: "Grow Business Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Grow Business Solutions | Premium Web Development Agency",
    description:
      "Building scalable networks and technical excellence for global business expansion. Expert web development, MERN stack, and digital solutions.",
    url: "https://www.growbusinessbd.com/",
    siteName: "Grow Business Solutions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grow Business Solutions - Technical Excellence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grow Business Solutions | Technical Excellence",
    description: "Building scalable networks and technical excellence for global business expansion.",
    images: ["/og-image.png"],
    creator: "@growbusiness",
  },
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${hindSiliguri.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Grow Business Solutions",
              "url": "https://www.growbusinessbd.com",
              "logo": "https://www.growbusinessbd.com/logo.png",
              "description": "Premium Web Development Agency specializing in MERN stack, Next.js, and technical excellence.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Bangladesh"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+8801884369340",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://facebook.com/growbusinessbd",
                "https://twitter.com/growbusinessbd",
                "https://linkedin.com/company/grow-business-solutions"
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-[#0b0c18] antialiased text-white flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
