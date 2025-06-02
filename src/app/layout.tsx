"use client";

import { ReactNode } from "react";
import Providers from "@/components/providers";
import Image from "next/image";
import logoImg from "@/public/inner-hero-logo.svg";
import "./globals.css";

function Header() {
  return (
    <header className="p-6 border-b border-gray-200">
      <a href="#" className="flex items-center gap-2">
        <Logo />
        <h1 className="truncate font-semibold">Innner Hero</h1>
      </a>
    </header>
  );
}

// Компонент Logo (можно заменить на ваш SVG)
function Logo() {
  return (
    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
      <Image src={logoImg} alt="Logo" />
    </div>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-sky-50">
        <div className="min-h-screen mx-4 my-4 rounded-xl bg-white">
          <Header />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
