import "@/styles/globals.scss";

import type { Metadata } from "next";

import { description, name } from "@/package.json";

export const metadata: Metadata = {
  title: name,
  description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
