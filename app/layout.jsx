import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/navbar/Navbar";
import Footer from "./Components/footer/Footer";
import configurations from "@/_data/config";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/_data/auth";
import AuthProvider from "@/_data/AuthProvider";
import CheckToken from "./Components/(Misc)/Utils/CheckToken";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: configurations.title,
  description: configurations.description,
  icons: configurations.icons,
  canonical: configurations.canonical,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <CheckToken />
      <AuthProvider>
        <body className={outfit.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
