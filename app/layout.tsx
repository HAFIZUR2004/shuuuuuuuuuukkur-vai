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

export const metadata = {
  title: {
    default: "Grow Business Solutions | Web Development Agency",
    template: "%s | Grow Business Solutions",
  },
  description:
    "Building scalable networks and technical excellence for global business expansion. Expert web development, MERN stack, and digital solutions.",
  keywords: [
    "web development",
    "MERN stack",
    "Next.js",
    "React",
    "business solutions",
    "Bangladesh",
  ],
  authors: [{ name: "Grow Business Solutions" }],
  openGraph: {
    title: "Grow Business Solutions | Web Development Agency",
    description:
      "Building scalable networks and technical excellence for global business expansion.",
    url: "https://www.growbusinessbd.com/",
    siteName: "Grow Business Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grow Business Solutions",
    description: "Building scalable networks and technical excellence.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
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
      <body
        className={`${inter.className} bg-[#0b0c18] antialiased text-white flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
