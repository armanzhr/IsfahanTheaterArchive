import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { useRolesStore } from "@/service/store/useRolesStore";

import { useShowsStore } from "@/service/store/useShowsStore";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import { cn } from "@/utils/cn";
import { Changes, Show } from "@/utils/types";
import { UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
var moment = require("moment-jalaali");

const ShowChanges = ({
  open,
  setOpen,
  selectedRequest,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  selectedRequest?: Changes | null;
}) => {
  const { getShowInfo, showInfo } = useShowsStore();
  const { getVenues, venues } = useVenuesStore();
  const { getRoles, roles } = useRolesStore();
  const { getMediasList, listMedias } = useMediaStore();
  const [isGettingShow, setIsGettingShow] = useState(true);
  const [showChanges, setShowChanges] = useState<{
    id: number;
    posterImageId: number;
    imageIds: number[];
    title: string;
    slug: string;
    description: string;
    metaDescription: string;
    showTimes: {
      id?: number;
      showId?: number;
      venueId?: number;
      startDate?: string;
      endDate?: string;
      showTimeStart?: string;
      isDeleted?: boolean;
    }[];
    showPeopleRoles: {
      id?: number;
      showId?: number;
      personId: number;
      roleId: number;
      createdAt?: string;
      isDeleted?: boolean;
      firstName?: string;
      lastName?: string;
      startYear: number;
      avatarImageId: number;
    }[];
  } | null>();

  function formatTime(inputTime: string) {
    // اگر ورودی به شکل "HH:MM:SS" است، فقط "HH:MM" را برگردان
    if (inputTime.length === 8) {
      return inputTime.slice(0, 5);
    }
    // اگر ورودی به شکل "HH:MM" است، همان را برگردان
    return inputTime;
  }

  const fetchShowInfo = async () => {
    setIsGettingShow(true);

    try {
      const res = await getShowInfo(selectedRequest?.entityId!);
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
  const fetchRoles = async () => {
    try {
      const res = await getRoles();
    } catch (error) {
      toast.error("خطا در دریافت لیست نقش ها");
    }
  };
  const fetchVenues = async () => {
    try {
      const res = await getVenues();
    } catch (error) {
      toast.error("خطا در دریافت لیست محل های اجرا");
    }
  };

  useEffect(() => {
    if (!listMedias) {
      fetchMedias();
    }
    if (!venues) {
      fetchVenues();
    }
    if (!roles) {
      fetchRoles();
    }
    if (selectedRequest) {
      fetchShowInfo();
      setShowChanges(JSON.parse(selectedRequest.changes));
    }
  }, [selectedRequest]);

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
              <div className="grid gap-4 md:grid-cols-[1fr_250px]">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                  <article className="grid grid-cols-5 items-center gap-4">
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
                            (item) => item.id === showChanges?.posterImageId
                          )?.url
                        }`}
                      />
                    </div>
                  </article>
                  <Separator />
                  <article className="grid grid-cols-5 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      نام نمایش:
                    </Label>
                    <h6 className="font-bold col-span-2 text-sm">
                      {showInfo?.title}
                    </h6>
                    <h6 className="font-bold col-span-2 text-sm">
                      {showChanges?.title}
                    </h6>
                  </article>
                  <Separator />
                  <article className="grid grid-cols-5 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      نامک :
                    </Label>
                    <h6 className="font-semibold col-span-2 text-sm">
                      {showInfo?.slug}
                    </h6>
                    <h6 className="font-semibold col-span-2 text-sm">
                      {showChanges?.slug}
                    </h6>
                  </article>
                  <Separator />
                  <article className="grid grid-cols-5 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      توضیحات :
                    </Label>
                    <h6 className="font-semibold col-span-2 text-sm">
                      {showInfo?.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: showInfo?.description,
                          }}
                        />
                      )}
                    </h6>
                    <h6 className="font-semibold col-span-2 text-sm">
                      {showChanges?.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: showChanges?.description,
                          }}
                        />
                      )}
                    </h6>
                  </article>
                  <Separator />
                  <article className="grid grid-cols-5 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      محل های اجرا :
                    </Label>
                    <ul className="font-semibold col-span-2 text-sm">
                      {showInfo?.showTimes.map((showTime) => (
                        <li key={showTime.id} className="flex flex-col">
                          <span>
                            {
                              venues?.filter(
                                (venue) => venue.id === Number(showTime.venueId)
                              )[0]?.name
                            }
                          </span>
                          <span className="font-medium text-xs">
                            (از{" "}
                            {moment(showTime?.startDate).format(
                              "jYYYY/jMM/jDD"
                            )}
                            تا
                            {moment(showTime?.endDate).format("jYYYY/jMM/jDD")}
                            ساعت {formatTime(showTime?.showTimeStart!)})
                          </span>
                        </li>
                      ))}
                    </ul>
                    <ul className="font-semibold col-span-2 text-sm">
                      {showChanges?.showTimes.map((showTime) => (
                        <li key={showTime.id} className="flex flex-col">
                          <span>
                            {
                              venues?.filter(
                                (venue) => venue.id === Number(showTime.venueId)
                              )[0]?.name
                            }
                          </span>
                          <span className="font-medium text-xs">
                            (از{" "}
                            {moment(showTime?.startDate).format(
                              "jYYYY/jMM/jDD"
                            )}
                            تا
                            {moment(showTime?.endDate).format("jYYYY/jMM/jDD")}
                            ساعت {formatTime(showTime?.showTimeStart!)})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                  <Separator />
                  <article className="grid grid-cols-5 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      عوامل:
                    </Label>
                    <ul className="font-semibold col-span-2 text-sm">
                      {roles
                        ?.filter((role) =>
                          showInfo?.showPeopleRoles.some(
                            (person) => person.roleId === role.id
                          )
                        )
                        ?.map((item) => (
                          <div className="mb-2" key={item.id}>
                            <h3 className="text-sm font-semibold">
                              {item.name}
                            </h3>
                            <ul>
                              {showInfo?.showPeopleRoles
                                .filter((person) => person.roleId === item.id)
                                .map((person) => (
                                  <li key={person.id}>
                                    <Badge variant="outline" className="m-1">
                                      <div className="flex w-full items-center gap-2">
                                        <Avatar className=" h-7 w-7 sm:flex">
                                          <AvatarImage
                                            src={`${config.fileURL}/${
                                              listMedias?.find(
                                                (item) =>
                                                  item.id ===
                                                  person?.avatarImageId
                                              )?.url
                                            }`}
                                            alt="Avatar"
                                          />
                                          <AvatarFallback>
                                            <UserIcon className="opacity-50 h-5 w-5" />
                                          </AvatarFallback>
                                        </Avatar>
                                        {`${person?.firstName} ${person?.lastName}`}
                                        {person?.startYear && (
                                          <p className=" text-gray-500 text-xs">
                                            {person?.startYear
                                              ?.toString()
                                              .slice(-2)}{" "}
                                          </p>
                                        )}
                                      </div>
                                    </Badge>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                    </ul>
                    <ul className="font-semibold col-span-2 text-sm">
                      {roles
                        ?.filter((role) =>
                          showChanges?.showPeopleRoles.some(
                            (person) => person.roleId === role.id
                          )
                        )
                        ?.map((item) => (
                          <div className="mb-2" key={item.id}>
                            <h3 className="text-sm font-semibold">
                              {item.name}
                            </h3>
                            <ul>
                              {showChanges?.showPeopleRoles
                                .filter((person) => person.roleId === item.id)
                                .map((person) => (
                                  <li key={person.id}>
                                    <Badge variant="outline" className="m-1">
                                      <div className="flex w-full items-center gap-2">
                                        <Avatar className=" h-7 w-7 sm:flex">
                                          <AvatarImage
                                            src={`${config.fileURL}/${
                                              listMedias?.find(
                                                (item) =>
                                                  item.id ===
                                                  person?.avatarImageId
                                              )?.url
                                            }`}
                                            alt="Avatar"
                                          />
                                          <AvatarFallback>
                                            <UserIcon className="opacity-50 h-5 w-5" />
                                          </AvatarFallback>
                                        </Avatar>
                                        {`${person?.firstName} ${person?.lastName}`}
                                        {person?.startYear && (
                                          <p className=" text-gray-500 text-xs">
                                            {person?.startYear
                                              ?.toString()
                                              .slice(-2)}{" "}
                                          </p>
                                        )}
                                      </div>
                                    </Badge>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                    </ul>
                  </article>
                  <Separator />
                  <article className="grid grid-cols-5 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      گالری:
                    </Label>
                    <ul className="font-semibold col-span-2 text-sm ">
                      <div className="grid grid-cols-3 gap-2">
                        {showInfo?.imagesIDs
                          .split(",")
                          ?.map((image: string) => (
                            <li key={image} className="flex flex-col">
                              <img
                                width={80}
                                height={80}
                                alt={showInfo?.title}
                                className="aspect-square rounded-md object-cover w-full"
                                src={`${config.fileURL}/${
                                  listMedias?.find(
                                    (item) => item.id === Number(image)
                                  )?.url
                                }`}
                              />
                            </li>
                          ))}
                      </div>
                    </ul>
                    <ul className="font-semibold col-span-2 text-sm ">
                      <div className="grid grid-cols-3 gap-2">
                        {showChanges?.imageIds?.map((image: number) => (
                          <li key={image} className="flex flex-col">
                            <img
                              width={80}
                              height={80}
                              alt={showInfo?.title}
                              className="aspect-square rounded-md object-cover w-full"
                              src={`${config.fileURL}/${
                                listMedias?.find((item) => item.id === image)
                                  ?.url
                              }`}
                            />
                          </li>
                        ))}
                      </div>
                    </ul>
                  </article>
                  <Separator />
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
