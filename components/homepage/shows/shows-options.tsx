"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "@/utils/functions/debounce";
import { DramaIcon, SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ShowsOptions = () => {
  const [titleValue, setTitleValue] = useState("");

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
    <div className="bg-blue-200">
      <div className=" w-full max-w-sm flex items-center gap-3">
        <h3 className="text-base font-semibold flex gap-1 items-center whitespace-nowrap">
          <span>
            <DramaIcon />
          </span>
          نمایش ها
        </h3>

        <div className="relative">
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
      </div>
    </div>
  );
};

export default ShowsOptions;
