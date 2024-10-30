"use client";
import { Input } from "@/components/ui/input";
import { debounce } from "@/utils/functions/debounce";
import { DramaIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ShowsOptions = () => {
  const [titleValue, setTitleValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // تابع جستجو برای ارسال درخواست به سرور
  const searchProducts = async (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    }
    router.push(`/test/show?${params.toString()}`);
  };

  // تابع debounce شده برای جلوگیری از درخواست‌های مکرر
  const debouncedSearch = debounce(searchProducts, 1500);

  useEffect(() => {
    if (titleValue) {
      debouncedSearch(titleValue);
    }
  }, [titleValue]);

  return (
    <div className="bg-blue-200">
      <div className=" w-full max-w-sm flex items-center gap-3">
        <h3 className="text-base font-semibold flex gap-1 items-center whitespace-nowrap">
          <span>
            <DramaIcon />
          </span>
          نمایش ها
        </h3>

        <Input
          onChange={(e) => setTitleValue(e.target.value)}
          type="email"
          id="email"
          placeholder="نام نمایش مورد نظر..."
        />
      </div>
    </div>
  );
};

export default ShowsOptions;
