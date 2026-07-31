import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "수학교실",
  description: "나만의 교육용 웹앱 만들기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col font-sans tracking-tight bg-gray-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
