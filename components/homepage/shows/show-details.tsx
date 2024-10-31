"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { OneShowResponse, Show } from "@/utils/types";
import { ChevronLeft, EyeIcon, Share2 } from "lucide-react";
import React from "react";
import ShowBreadcrumb from "./show-breadcrumb";
import { Button } from "@/components/ui/button";
import config from "@/config";
import ShowPeople from "./show-people";

const ShowDetails = ({ show }: { show: OneShowResponse }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `نمایش ${show.title}`,

          url: window.location.href,
        });
        console.log("اشتراک‌گذاری با موفقیت انجام شد");
      } catch (error) {
        console.error("اشتباهی رخ داد", error);
      }
    } else {
      alert("مرورگر شما از قابلیت اشتراک‌گذاری پشتیبانی نمی‌کند");
    }
  };

  return (
    <div className="w-full">
      <header className=" grid grid-cols-4 gap-5 h-full">
        <aside className="col-span-1">
          <img
            loading="lazy"
            src={`${config.fileURL}${show.posterImageUrl}`}
            alt={show.posterImageTitle}
            className="w-full h-96 object-cover rounded-xl group-hover:brightness-50 duration-500 transition-all"
          />
          <p className="text-sm mt-2 flex gap-1 opacity-50">
            <span>
              <EyeIcon className="h-5 w-5" />
            </span>
            <span className="font-semibold">50</span>
          </p>
        </aside>
        <main className=" col-span-3">
          <header className="h-14 flex items-center justify-between">
            <ShowBreadcrumb title={show.title} />
            <div>
              <Button
                onClick={() => handleShare()}
                className="h-7 w-7"
                variant="ghost"
                size="icon"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <Separator />
          <div>
            <h2 className="font-semibold text-lg my-2">عوامل</h2>
            <ShowPeople people={show.showPeopleRoles} />
          </div>
          {show.description && (
            <>
              <Separator />
              <div>
                <h2 className="font-semibold text-lg my-2">توضیحات</h2>

                <div
                  dangerouslySetInnerHTML={{
                    __html: show?.description,
                  }}
                />
              </div>
            </>
          )}
          {show.images.length > 0 && (
            <>
              <Separator />
              <div>
                <h2 className="font-semibold text-lg my-2">تصاویر</h2>
                <div className="grid grid-cols-3 gap-4">
                  {show.images.map((image) => (
                    <img
                      key={image.id}
                      loading="lazy"
                      src={`${config.fileURL}${image.url}`}
                      alt={show.posterImageTitle}
                      className="w-full object-cover rounded-xl group-hover:brightness-50 duration-500 transition-all"
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </header>
    </div>
  );
};

export default ShowDetails;
