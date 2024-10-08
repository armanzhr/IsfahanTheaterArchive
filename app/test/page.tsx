import SideBySide from "@/components/homepage/side-by-side";
import CarouselShow from "@/components/pages/home/CarouselShow";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PageWrapper from "@/components/wrapper/page-wrapper";
import config from "@/config";
import { Show } from "@/utils/types";
import React from "react";

const page = async () => {
  let data = await fetch("/Shows");
  let posts: Show[] = await data.json();

  return (
    <>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <ul>
        {posts.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
      <SideBySide />
    </>
  );
};

export default page;
