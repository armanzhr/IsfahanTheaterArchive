import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "تئاتر اصفهان",
};
const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  adjustFontFallback: false,
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="h-full" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="https://utfs.io/f/31dba2ff-6c3b-4927-99cd-b928eaa54d5f-5w20ij.png"
          as="image"
        />
        <link
          rel="preload"
          href="https://utfs.io/f/69a12ab1-4d57-4913-90f9-38c6aca6c373-1txg2.png"
          as="image"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={`h-full ${vazir.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster className={vazir.className} />
        </ThemeProvider>
      </body>
    </html>
  );
}
