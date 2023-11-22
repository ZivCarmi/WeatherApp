import { ReactNode } from "react";
import Navbar from "./Header";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";
import Container from "../Theme/Container";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      <Navbar />
      <main className="p-4">
        <Container>{children}</Container>
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
