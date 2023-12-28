import type { Metadata } from "next";

import packageJson from "@/package.json";

export const metadata: Metadata = {
  title: packageJson.name,
  description: packageJson.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: "#000" }}>
      <body>{children}</body>
    </html>
  );
}
