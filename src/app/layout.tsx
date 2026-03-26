import "~/styles/globals.css";
import localFont from "next/font/local";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/app/_components/Header";

export const metadata: Metadata = {
  title: "Mercato Fabbrica",
  description: "WE EAT,then WE DO EVERYTHING ELSE",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const centralAvenueBold = localFont({
  src: [
    {
      path: "../../public/fonts/CENTRAL AVENUE-20250821T135301Z-1-001/CENTRAL AVENUE/Web/central-avenue-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/CENTRAL AVENUE-20250821T135301Z-1-001/CENTRAL AVENUE/Web/central-avenue-bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-central-avenue-bold",
});

const sackersLight = localFont({
  src: [
    {
      path: "../../public/fonts/SACKERS GOTHIC-20250821T135303Z-1-001/SACKERS GOTHIC/Sackers Gothic Family/Monotype - SackersGothicStd-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-sackers-light",
});

const sackersHeavy = localFont({
  src: [
    {
      path: "../../public/fonts/SACKERS GOTHIC-20250821T135303Z-1-001/SACKERS GOTHIC/Sackers Gothic Family/Monotype - SackersGothicStd-Heavy.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-sackers-heavy",
});

const untitledSans = localFont({
  src: [
    {
      path: "../../public/fonts/UNTITLED SANS-20250821T135304Z-1-001/UNTITLED SANS/UntitledSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-untitled-sans",
});

const untitledSerif = localFont({
  src: [
    {
      path: "../../public/fonts/UNTITLED SERIF-20250821T135306Z-1-001/UNTITLED SERIF/DesktopFonts/UntitledSerif-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-untitled-serif",
});

const untitledSerifItalic = localFont({
  src: [
    {
      path: "../../public/fonts/UNTITLED SERIF-20250821T135306Z-1-001/UNTITLED SERIF/DesktopFonts/UntitledSerif-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-untitled-serif-italic",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const _session = await auth();

  return (
    <html
      lang="en"
      className={`${sackersLight.variable} ${sackersHeavy.variable} ${centralAvenueBold.variable} ${untitledSans.variable} ${untitledSerif.variable} ${untitledSerifItalic.variable}`}
    >
      <body className="bg-[#e8e5e0]">
        <Header />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
