import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/providers/ModalProvider";
import type { Metadata } from "next";

import "./globals.css";
import { Toasterprovider } from "@/providers/ToastProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
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
          <Toaster
            position="top-center"
            toastOptions={{
              style: { background: "#474646" },
            }}
            richColors={true}
            closeButton={true}
          />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
