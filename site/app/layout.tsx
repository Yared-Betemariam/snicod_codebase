import { font } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Snicod - Stop repeating code & Save Time",
    template: "%s | Snicod - Stop repeating code & Save Time",
  },
  description: "",
  icons: [
    {
      rel: "icon",
      url: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Analytics />
        <div className="pattern fixed inset-0 opacity-[0.02]" />
        {children}
      </body>
    </html>
  );
}
