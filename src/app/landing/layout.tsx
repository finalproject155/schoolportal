import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import Nav from "@/app/navLayout/nav/nav"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-PORTAL",
  description: "The School Portal Website is a centralized digital platform designed to simplify and enhance communication, academic management, and administrative processes within a school environment. It provides students, teachers, and administrators with secure access to essential academic resources and tools in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
