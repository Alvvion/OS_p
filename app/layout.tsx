/* eslint-disable linebreak-style */
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio OS",
  description: "Os on Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
