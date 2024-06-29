import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const inter = Inter({ subsets: ["latin"] });
import SessionWrapper from "@/Components/SessionWrapper";

export const metadata = {
  title: "Code-Synker",
  description: "Sync Your code now!!!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <SessionWrapper>
          <Navbar />
          <div className="min-h-screen relative">
            <div className="absolute top-0 left-0 z-[-2] h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}


