import SideBySide from "@/components/homepage/side-by-side";
import CarouselShow from "@/components/pages/home/CarouselShow";
import PageWrapper from "@/components/wrapper/page-wrapper";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <PageWrapper>
      <SideBySide />
    </PageWrapper>
  );
};

export default page;
