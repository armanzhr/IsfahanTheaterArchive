import { ReactNode } from "react";
import DashboardSideBar from "./_components/dashboard-side-bar";
import DashboardTopNav from "./_components/dashbord-top-nav";
import DashboardProvider from "./dashboard-provider";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProvider>
      <div className="grid h-full w-full lg:grid-cols-[280px_1fr]">
        <DashboardSideBar />
        <DashboardTopNav>
          <main className="flex flex-col gap-4 p-4 lg:gap-6">{children}</main>
        </DashboardTopNav>
      </div>
    </DashboardProvider>
  );
}
