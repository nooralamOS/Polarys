import type { Metadata } from "next";
import { Martian_Mono } from "next/font/google";
import "./globals.css";
import DialKitProvider from "@/components/DialKitProvider";
const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-martian-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Polarys - We Turn Your LinkedIn Into a Consistent Revenue Machine",
  description:
    "Trusted by founders backed by Y Combinator, Silicon Valley, and a16z. We turn your LinkedIn into a consistent revenue machine.",
  icons: {
    icon: "/polarys logo black.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${martianMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <DialKitProvider />
      </body>
    </html>
  );
}
