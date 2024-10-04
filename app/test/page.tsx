import SideBySide from "@/components/homepage/side-by-side";
import CarouselShow from "@/components/pages/home/CarouselShow";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";

const page = () => {
  return (
    <PageWrapper>
      <CarouselShow />

      <SideBySide />
    </PageWrapper>
  );
};

export default page;
