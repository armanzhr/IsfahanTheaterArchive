import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";

const DashboardProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" h-full flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("animate-spin")}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <p>لطفا صبر کنید...</p>
      </div>
    </div>
  );
};

export default DashboardProvider;
