import { AccordionComponent } from "@/components/homepage/accordion-component";
import BlogSample from "@/components/homepage/blog-samples";
import HeroSection from "@/components/homepage/hero-section";

import SideBySide from "@/components/homepage/side-by-side";
import PageWrapper from "@/components/wrapper/page-wrapper";
import config from "@/config";

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
        <HeroSection />
      </div>
      <div className="flex my-[8rem] w-full justify-center items-center">
        <SideBySide />
      </div>
      <div className="flex flex-col p-2 w-full justify-center items-center"></div>
      <div className="max-w-[1200px] p-8 mt-[2rem] lg:mt-[6rem] lg:mb-[5rem]">
        <BlogSample />
      </div>

      <div className="flex justify-center items-center w-full my-[8rem]">
        <AccordionComponent />
      </div>
    </PageWrapper>
  );
}