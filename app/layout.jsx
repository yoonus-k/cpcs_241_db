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
