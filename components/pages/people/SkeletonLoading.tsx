import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonLoading = ({ count }: { count: number }) => {
  return (
    <>
      {Array(count)
        .fill(1)
        .map((card, index) => (
          <div key={index} className="flex items-center gap-3 space-x-4 p-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className={`h-4 w-[${100}px]`} />
            </div>
          </div>
        ))}
    </>
  );
};

export default SkeletonLoading;
