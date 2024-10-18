"use client";
import React from "react";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { ArrowLeft, ArrowRightIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="flex flex-col items-center min-h-80 justify-center gap-6">
      <div className="flex items-center ">
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span className="text-xs">معرفی اصفهان تئاتر</span>
            <ArrowLeft className="mr-1 size-3 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
          </AnimatedShinyText>
        </div>
      </div>
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl text-center lg:text-5xl font-bold">
            جلوه‌گاه هنر تئاتر اصفهان
          </h1>
          <h4 className="text-center opacity-70">
            هدف ما گرامیداشت و حفظ یاد همه کسانی است که از طریق هنر نمایش، به هر
            شکل و سبکی، در زنده نگه داشتن تئاتر اصفهان سهم داشته‌اند.
          </h4>
        </div>
        <Button size="sm">
          <span>صفحه نمایش ها</span>
          <ArrowLeft className="mr-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
