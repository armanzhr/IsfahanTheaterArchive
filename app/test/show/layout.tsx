import ShowsHeader from "@/components/homepage/shows/shows-header";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ShowsHeader />
      {children}
    </>
  );
}
