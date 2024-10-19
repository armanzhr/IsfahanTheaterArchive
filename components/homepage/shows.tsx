import { Show } from "@/utils/types";
import React from "react";

const Shows = ({ shows }: { shows: Show[] }) => {
  console.log(shows);
  return (
    <div>
      <h3 className="text-lg font-semibold">نمایش ها</h3>
      <div className=" mt-5 grid gap-10 grid-cols-5">
        {shows.map((item) => (
          <div
            className="h-64 hover:scale-105 hover:shadow-lg transition-all duration-500"
            key={item.id}
          >
            <img
              loading="lazy"
              src="/theater.jpg"
              alt="Image"
              className="h-full w-full object-cover aspect-square rounded-lg"
            />
            <div className="rounded-lg text-center text-sm font-semibold mt-1">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shows;
