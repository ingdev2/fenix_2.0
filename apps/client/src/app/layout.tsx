import React from "react";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fénix",
  description: "Software de Clínica Bonnadona",
  icons: {
    icon: "./favicon.ico",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" style={{ margin: 0, padding: 0 }}>
      <head className="container-head-app">
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <main className="container-main-app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
