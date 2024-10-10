import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import config from "@/config";
import { useMediaStore } from "@/service/store/useMediaStore";

import { useShowsStore } from "@/service/store/useShowsStore";
import { Show } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ShowChanges = ({
  open,
  setOpen,
  selectedShow,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  selectedShow?: Show | null;
}) => {
  const { getShowInfo, showInfo } = useShowsStore();
  const { getMediasList, listMedias } = useMediaStore();
  const [isGettingShow, setIsGettingShow] = useState(true);
  const fetchShowInfo = async () => {
    setIsGettingShow(true);

    try {
      const res = await getShowInfo(selectedShow?.id!);
      setIsGettingShow(false);
    } catch (error) {
      toast.error("خطا در دریافت اطلاعات نمایش");
      setIsGettingShow(false);
    }
  };

  const fetchMedias = async () => {
    try {
      const res = await getMediasList();
    } catch (error) {
      toast.error("خطا در دریافت لیست رسانه ها");
    }
  };

  useEffect(() => {
    if (listMedias) {
      fetchMedias();
    }
    fetchShowInfo();
  }, [selectedShow]);
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-full">
          <DrawerHeader className="p-0 pb-2 flex justify-center">
            <div className="max-w-[59rem] w-full flex items-center justify-between">
              <DrawerTitle className="text-center">مشاهده تغییرات</DrawerTitle>
              <div className="flex gap-2">
                <DrawerClose asChild>
                  <Button variant="outline">لغو</Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerHeader>

          <main className="grid overflow-y-auto flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        پوستر
                      </Label>
                      <div className="col-span-2">
                        <img
                          width={80}
                          height={80}
                          alt={showInfo?.title}
                          className="aspect-square rounded-md object-cover w-full"
                          src={`${config.fileURL}/${
                            listMedias?.find(
                              (item) => item.id === showInfo?.posterImageId
                            )?.url
                          }`}
                        />
                      </div>
                      <div className="col-span-2">
                        <img
                          width={80}
                          height={80}
                          alt={showInfo?.title}
                          className="aspect-square rounded-md object-cover w-full"
                          src={`${config.fileURL}/${
                            listMedias?.find(
                              (item) => item.id === showInfo?.posterImageId
                            )?.url
                          }`}
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        نام نمایش:
                      </Label>
                      <h6 className="font-bold col-span-2 text-sm">
                        {showInfo?.title}
                      </h6>
                      <h6 className="font-bold col-span-2 text-sm">
                        {showInfo?.title}
                      </h6>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        نامک :
                      </Label>
                      <h6 className="font-semibold col-span-2 text-sm">
                        {showInfo?.slug}
                      </h6>
                      <h6 className="font-semibold col-span-2 text-sm">
                        {showInfo?.slug}
                      </h6>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        توضیحات :
                      </Label>
                      <h6 className="font-semibold col-span-2 text-sm">
                        {showInfo?.description}
                      </h6>
                      <h6 className="font-semibold col-span-2 text-sm">
                        {showInfo?.description}
                      </h6>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        محل های اجرا :
                      </Label>
                      <h6 className="font-semibold col-span-2 text-sm">
                        {showInfo?.description}
                      </h6>
                      <h6 className="font-semibold col-span-2 text-sm">
                        {showInfo?.description}
                      </h6>
                    </div>
                    <Separator />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShowChanges;
