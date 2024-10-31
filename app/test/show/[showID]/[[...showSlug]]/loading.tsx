import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="w-full">
      <header className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 h-full">
        <aside className="col-span-1">
          <Skeleton className="h-96 w-full" />
        </aside>
        <main className="md:col-span-2 lg:col-span-3">
          <header className="h-14 flex items-center justify-between">
            <Skeleton className="w-52 h-7" />
          </header>
          <Separator />
          <div className="my-5">
            <h2 className="font-semibold text-lg my-2">
              <Skeleton className="w-32 h-8" />
            </h2>
            {Array.from({ length: 5 }).map((item, index) => (
              <Skeleton key={index} className="w-64 h-10 my-1" />
            ))}
          </div>
        </main>
      </header>
    </div>
  );
};

export default loading;
