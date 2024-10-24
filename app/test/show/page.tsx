import ShowItem from "@/components/homepage/shows/show-item";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Ripple from "@/components/ui/ripple";
import config from "@/config";
import { ShowResponse } from "@/utils/types";
import { InfoIcon } from "lucide-react";
import React from "react";

const page = async () => {
  let data = await fetch(config.baseURL + "/Shows");
  let shows: ShowResponse = await data.json();
  return (
    <>
      <div className="relative flex h-[150px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl">
        <p className="z-10 whitespace-pre-wrap text-center text-3xl font-medium tracking-tighter text-white">
          تئاتر زنده است...
        </p>
        <Ripple />
      </div>
      <Alert className="my-3">
        <AlertTitle className="flex items-center gap-1">
          <InfoIcon className="h-4 w-4" />
          <span>توضیح مهم</span>
        </AlertTitle>
        <AlertDescription>
          اطلاعاتی که در این صفحه آمده است بر اساس داده‌ هایی بوده که تاکنون به
          آن‌ها دسترسی داشته‌ایم. چنانچه پوستر نمایشی بوده که از قلم افتاده،
          لطفاً با کیفیت خوب برای ما از طریق تلگرام یا اینستاگرام یا ایمیل ارسال
          کنید.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-2 gap-3">
        {shows.data.map((show) => (
          <ShowItem key={show.id} item={show} />
        ))}
      </div>
    </>
  );
};

export default page;
