import React from "react";

const ShowItem = ({ item }: { item: any }) => {
  return (
    <div>
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
  );
};

export default ShowItem;
