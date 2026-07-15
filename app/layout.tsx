import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lunch Between Us",
  description: "Find a fair MRT meeting point in Singapore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
