import { Inter } from "next/font/google";
import "@styles/globals.css";
import dynamic from "next/dynamic";
import Provider from "@components/provider";

const Nav = dynamic(() => import("@components/navbar/nav"), { ssr: false });
const Footer = dynamic(() => import("@components/footer/footer"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Real Estate",
  description: "Real Estate Management",
  keywords: "Real Estate, Real Estate Management",
  icons: [
    {
      href: "/favicon.ico",
      type: "image/x-icon",
      sizes: "16x16",
    },
    {
      href: "/favicon.ico",
      type: "image/x-icon",
      sizes: "32x32",
    },
    {
      href: "/favicon.ico",
      type: "image/x-icon",
      sizes: "48x48",
    },
    {
      href: "/favicon.ico",
      type: "image/x-icon",
      sizes: "62x62",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Nav />
          <main className="app min-h-screen">{children}</main>

          <Footer />
        </Provider>
      </body>
    </html>
  );
}
