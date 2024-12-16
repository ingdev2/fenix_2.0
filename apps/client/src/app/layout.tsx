import React from "react";

import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import themeConfig from "@/theme/themeConfig";
import es_ES from "antd/locale/es_ES";
import { Providers } from "@/redux/providers";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Fénix",
  description: "Software de Clínica Bonnadona",
  icons: {
    icon: "/logos/mockup/icon.png",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" style={{ margin: 0, padding: 0 }}>
      <body className={nunito.className} style={{ margin: 0, padding: 0 }}>
        <Providers>
          <main className="container-main-app">
            <AntdRegistry>
              <ConfigProvider theme={themeConfig} locale={es_ES}>
                {children}
              </ConfigProvider>
            </AntdRegistry>
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
