import { Show } from "@/utils/types";
import { DramaIcon, Theater } from "lucide-react";
import React from "react";

const Shows = ({ shows }: { shows: Show[] }) => {
  console.log(shows);
  return (
    <div>
      <h3 className="text-lg font-semibold flex gap-2 items-center">
        <span>
          <DramaIcon />
        </span>
        نمایش ها
      </h3>
      <div className="grid gap-5 lg:gap-10 lg:grid-cols-5">
        {shows.splice(-5).map((item) => (
          <div
            className="mt-5 group relative cursor-pointer h-64 hover:scale-105 hover:shadow-lg transition-all duration-500"
            key={item.id}
          >
            <img
              loading="lazy"
              src="/theater.jpg"
              alt="Image"
              className="h-full w-full object-cover aspect-square rounded-lg group-hover:brightness-50 duration-500 transition-all"
            />
            <div className="group-hover:opacity-0 transition-all duration-500 rounded-lg text-center text-sm font-semibold mt-1">
              {item.title}
            </div>
            <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-xs">نمایش</span>
              <h3 className=" font-medium">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shows;
