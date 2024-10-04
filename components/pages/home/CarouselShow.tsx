"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const CarouselShow = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className="mx-auto w-full max-w-7xl lg:px-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="p-1">
              <Card className="h-80">
                <CardContent className="flex items-center justify-center">
                  <span className="text-4xl font-semibold">Arman</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div>
          <CarouselNext />
          <CarouselPrevious />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselShow;
