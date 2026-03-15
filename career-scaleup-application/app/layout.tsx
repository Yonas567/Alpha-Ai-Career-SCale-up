import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "./context/AuthContext";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { SocketProvider } from "@/context/SocketProvider";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerScaleUp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <SocketProvider>
              <AuthContextProvider>
                {children}
                {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
              </AuthContextProvider>
            </SocketProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
