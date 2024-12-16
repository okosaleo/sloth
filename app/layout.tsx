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
        <TonConnectUIProvider manifestUrl="https://harlequin-voluntary-carp-497.mypinata.cloud/ipfs/bafkreidz2poyaszcspqbliouka3wczndsaibbuhhomt2xkf4a3a2qko3jy">
        {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
