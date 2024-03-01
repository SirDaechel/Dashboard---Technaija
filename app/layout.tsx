import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "@/libs/redux-state/ReduxProvider";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard - Technaija",
  description: "Technaija dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#272829",
          fontFamily: "Poppins, sans-serif",
        },
      }}
    >
      <html lang="en">
        <body className={jost.className}>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
