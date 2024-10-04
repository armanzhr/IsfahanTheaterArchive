import { AccordionComponent } from "@/components/homepage/accordion-component";
import BlogSample from "@/components/homepage/blog-samples";
import HeroSection from "@/components/homepage/hero-section";
import SideBySide from "@/components/homepage/side-by-side";
import CarouselShow from "@/components/pages/home/CarouselShow";
import PageWrapper from "@/components/wrapper/page-wrapper";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      {/* <PageWrapper>
      <CarouselShow />

      <SideBySide />
    </PageWrapper> */}
      <div className=" h-full flex flex-col items-center justify-center">
        <p>صفحه اصلی سایت</p>
        <p>
          برای ورود به پنل{" "}
          <Link href="dashboard" className="text-blue-400">
            اینجا
          </Link>{" "}
          کلیک کنید
        </p>
      </div>
    </>
  );
};

export default page;
