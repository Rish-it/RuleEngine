import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from './components/header'; 
import { LampContainer } from "./components/ui/lamp"; 

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rule Engine",
  description: "AST based Rule Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LampContainer>
          <div className="min-h-screen flex flex-col items-center space-y-10">
            <Header />
            {children}
          </div>
        </LampContainer>
      </body>
    </html>
  );
}
