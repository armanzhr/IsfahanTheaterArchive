import { AccordionComponent } from "@/components/homepage/accordion-component";
import BlogSample from "@/components/homepage/blog-samples";
import HeroSection from "@/components/homepage/hero-section";
import SideBySide from "@/components/homepage/side-by-side";
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
