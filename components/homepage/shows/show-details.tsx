import { Separator } from "@/components/ui/separator";
import React from "react";

const ShowDetails = () => {
  return (
    <div className="w-full">
      <header className=" grid grid-cols-4 gap-5 h-full">
        <aside className="col-span-1">
          <img
            loading="lazy"
            src="/sina.jpg"
            alt="Image"
            className="w-full h-96 object-cover rounded-xl group-hover:brightness-50 duration-500 transition-all"
          />
        </aside>
        <main className=" col-span-3">
          <header className="h-14 flex items-center">show detail</header>
          <Separator />
          <div>show people</div>
        </main>
      </header>
    </div>
  );
};

export default ShowDetails;
