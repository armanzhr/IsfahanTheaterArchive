import PageWrapper from "@/components/wrapper/page-wrapper";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-7xl w-full px-6 lg:px-8">{children}</div>
    </PageWrapper>
  );
}
