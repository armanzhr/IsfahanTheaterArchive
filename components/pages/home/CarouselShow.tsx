"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Show } from "@/utils/types";

const CarouselShow = ({ shows }: { shows: Show[] }) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const lastFiveShows = shows.slice(-5);
  useEffect(() => {
    console.log(lastFiveShows);
  });
  return (
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
  );
};

export default CarouselShow;
