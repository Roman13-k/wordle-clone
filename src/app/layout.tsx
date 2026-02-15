import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import ToastStack from "@/components/ui/blocks/toasts/ToastStack";
import MiniToast from "@/components/ui/blocks/toasts/MiniToast";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import MainContainer from "@/components/ui/layout/MainContainer";
import { UpdateListener } from "@/components/ui/blocks/updater/UpdateListener";
import UpdateModal from "@/components/ui/blocks/updater/UpdateModal";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wordix",
  description: "Wordle clone with Electron",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={dmSans.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <main className="h-full"> {children}</main>

          <UpdateListener />
          <UpdateModal />

          <ToastStack />
          <MiniToast />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
