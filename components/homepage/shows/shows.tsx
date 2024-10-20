import { Show } from "@/utils/types";
import { DramaIcon, Theater } from "lucide-react";
import React from "react";
import ShowItem from "./show-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

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

      <div dir="rtl" className="relative">
        <Carousel dir="ltr" className="w-full">
          <CarouselContent>
            {shows.splice(-5).map((item, index) => (
              <CarouselItem
                className="basis-1/2 md:basis-1/4 lg:basis-1/5 mt-5 group relative cursor-pointer  transition-all duration-500"
                key={index}
              >
                <ShowItem item={item} />
                <div className="group-hover:opacity-0 transition-all duration-500 rounded-lg text-center text-base font-semibold mt-1">
                  {item.title}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Shows;
