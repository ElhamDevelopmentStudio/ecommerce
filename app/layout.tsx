import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/providers/modal-provider";
import type { Metadata } from "next";

import "./globals.css";
import { Toasterprovider } from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restocked",
  description: "Restocked",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Toasterprovider />
        <ModalProvider />
        {children}</body>
    </html>
    </ClerkProvider>
  );
}
