import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-6">
      {Array.from({ length: 20 }).map((item, index) => (
        <div key={index}>
          <Skeleton className="h-64" />
        </div>
      ))}
    </div>
  );
};

export default loading;
