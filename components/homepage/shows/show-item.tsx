import { Show } from "@/utils/types";
import Link from "next/link";
import React from "react";

const ShowItem = ({ item }: { item: Show }) => {
  return (
    <Link href={`test/show/${item.id}/${item.slug}`}>
      <div className="relative">
        <img
          loading="lazy"
          src="/theater.jpg"
          alt="Image"
          className="w-full h-64 object-cover rounded-lg group-hover:brightness-50 duration-500 transition-all"
        />

        <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 inset-0 flex flex-col items-center justify-center text-white">
          <span className="text-xs">نمایش</span>
          <h3 className=" font-medium">{item.title}</h3>
        </div>
      </div>
      <div className="group-hover:opacity-0 transition-all duration-500 rounded-lg text-center text-base font-semibold mt-1">
        {item.title}
      </div>
    </Link>
  );
};

export default ShowItem;