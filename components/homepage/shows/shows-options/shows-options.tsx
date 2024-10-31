"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "@/utils/functions/debounce";
import {
  ArrowDownNarrowWide,
  CalendarClock,
  DramaIcon,
  MapPin,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import VenueDateModal from "./venue-date-modal";

const ShowsOptions = () => {
  const [titleValue, setTitleValue] = useState("");
  const [openVenueDateModal, setOpenVenueDateModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // تابع جستجو برای ارسال درخواست به سرور
  const searchTitle = async () => {
    if (titleValue) {
      params.set("title", titleValue);
    } else {
      params.delete("title");
    }
    router.push(`/test/show?${params.toString()}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      searchTitle();
    }
  };
  const handleDeleteTitle = (e: any) => {
    params.delete("title");
    router.push(`/test/show?${params.toString()}`);
    setTitleValue("");
  };
  return (
    <div className="mb-3">
      <div className=" w-full flex items-center gap-3">
        <h3 className="text-base font-semibold flex gap-1 items-center whitespace-nowrap">
          <span>
            <DramaIcon />
          </span>
          نمایش ها
        </h3>

        <div className="flex gap-2">
          <div className="relative  max-w-sm">
            <Input
              className="px-8"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              type="title"
              id="title"
              onKeyDown={handleKeyDown}
              placeholder="نام نمایش مورد نظر..."
            />
            {titleValue && (
              <div className="absolute bottom-0 left-0 h-full flex items-center">
                <Button
                  onClick={handleDeleteTitle}
                  type="button"
                  className=" ml-2 w-7 h-7"
                  variant="link"
                  size="icon"
                >
                  <XIcon className="w-5 h-5" />
                </Button>
              </div>
            )}
            <div className="absolute bottom-0 right-0 h-full items-center flex mr-2">
              <SearchIcon className="w-5 h-5" />
            </div>
          </div>

          <div className="flex">
            <Button
              onClick={() => setOpenVenueDateModal(true)}
              variant="outline"
              className="rounded-l-none focus:z-10"
            >
              <span>
                <MapPin className="h-4 w-4" />
              </span>
              محل اجرا
            </Button>
            <Button variant="outline" className="rounded-r-none focus:z-10">
              <span>
                <CalendarClock className="h-4 w-4" />
              </span>
              زمان اجرا
            </Button>
          </div>

          <div className="flex -space-x-px">
            <Button variant="outline" className="rounded-l-none">
              Send Now
            </Button>
            <Button variant="outline" className="rounded-r-none">
              <ArrowDownNarrowWide className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <VenueDateModal
        open={openVenueDateModal}
        setOpen={setOpenVenueDateModal}
      />
    </div>
  );
};

export default ShowsOptions;
