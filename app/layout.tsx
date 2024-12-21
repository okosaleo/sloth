"use client";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const santa = localFont({
  src: "./fonts/OurSanta.woff2",
  variable: "--font-santa",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>         
                     
      <body
        className={`${santa.variable} antialiased bg-primary-bg`}
      >
        <TonConnectUIProvider manifestUrl="https://utfs.io/f/MyBJHXY8aJsOU6aDBEmI6zvSuD3Gh0sdF8RTErCnwkZJ4XqA">
        {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
