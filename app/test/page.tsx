import Header from "@/components/homepage/header";
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
  let data = await fetch(config.baseURL + "/Shows");
  let posts: Show[] = await data.json();

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <Header />
      <SideBySide />
    </div>
  );
};

export default page;
