import { Show, ShowInclusive } from "@/utils/types";
import { ArrowLeft, DramaIcon, Theater } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Shows = ({ shows }: { shows: ShowInclusive[] }) => {
  console.log(shows);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-base lg:text-lg font-semibold flex gap-2 items-center">
          <span>
            <DramaIcon />
          </span>
          نمایش ها
        </h3>
        <Link href="/test/show">
          <Button className="group" variant="outline" size="sm">
            <span>همه نمایش ها</span>
            <ArrowLeft className="mr-1 size-3 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
          </Button>
        </Link>
      </div>

      <div dir="rtl" className="relative mt-5">
        <Carousel dir="ltr" className="w-full">
          <CarouselContent>
            {shows.splice(-5).map((item, index) => (
              <CarouselItem
                className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                key={index}
              >
                <ShowItem item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Shows;
