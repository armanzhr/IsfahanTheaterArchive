"use client";
import { useAuthStore } from "@/service/store/useAuthStore";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { toast } from "sonner";

const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { preLoading, setPreLoading, getUserInfo } = useAuthStore();
  const router = useRouter();

  const getUserData = async () => {
    try {
      await getUserInfo();
      setPreLoading(false);
    } catch (error) {
      toast.error("لطفا ابتدا وارد شوید");
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      {preLoading ? (
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
      ) : (
        children
      )}
    </>
  );
};

export default DashboardProvider;
