import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideMenu from "@/components/SideMenu";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KAPETIN",
  description: "Cafe Online Ordering System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SidebarProvider>
          <SideMenu />
          <SidebarTrigger/>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
