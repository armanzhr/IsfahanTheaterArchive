"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MultiSelect } from "@/components/ui/multi-select";
import { useRolesStore } from "@/service/store/useRolesStore";
import { Media, People, Roles } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, XIcon } from "lucide-react";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { Content } from "@tiptap/core";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import ShowDetail from "./ShowDetail";
import ShowTime from "./ShowTime";
import ShowPeople from "./showPeople";
import SelectImageHandler from "../medias/SelectImage";
import { useMediaStore } from "@/service/store/useMediaStore";
import { toast } from "sonner";
import config from "@/config";
import { useShowsStore } from "@/service/store/useShowsStore";
var moment = require("moment-jalaali");
const UploadShow = ({
  open,
  setOpen,
  editValue,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  editValue?: Roles | null;
}) => {
  const { handleSubmit, register, watch, setValue, reset } = useForm();
  const [galleryImage, setGalleryImage] = useState<{
    poster: Media | null;
    otherImages: Media[];
  }>({ poster: null, otherImages: [] });
  const [isOpenMediaModal, setIsOpenMediaModal] = useState(false);
  const { selectedImage, getMedia, media } = useMediaStore();
  const handleCloseMediaModal = () => {
    setIsOpenMediaModal(false);
  };
  const { createShows } = useShowsStore();
  const [commandValue, setCommandValue] = useState("");

  const title = watch("title");
  const [description, setDescription] = useState<Content>("");
  const [imageMode, setImageMode] = useState<"avatar" | "gallery">();
  const [showTimes, setShowsTimes] = useState<
    { venueId: number; showDate: string; showTimeStart: string }[]
  >([]);
  const [selectedPeopleByRole, setSelectedPeopleByRole] = useState({}); // State for tracking selected people per role

  // Generate slug when title changes
  useEffect(() => {
    const slug = `${title}`.trim().replace(/\s+/g, "-");
    if (!title) {
      setValue("slug", null);
    } else {
      setValue("slug", slug);
    }
  }, [title, setValue]);

  const onSubmit = async (data: any) => {
    const result = [];

    for (const [roleId, peopleIds] of Object.entries(selectedPeopleByRole)) {
      peopleIds.forEach((personId) => {
        result.push({ roleId: parseInt(roleId), personId });
      });
    }

    const model = {
      posterImageId: galleryImage.poster?.id,
      title: data.title,
      slug: data.slug,
      description: description,
      metaDescription: "",
      showTimes: showTimes,
      imageIds: galleryImage.otherImages.map((item) => item.id),
      showPeopleRoles: result,
    };

    console.log(model);
  };

  useEffect(() => {
    console.log(selectedImage);

    if (selectedImage) {
      setIsOpenMediaModal(false);
      if (imageMode === "avatar") {
        setGalleryImage((prev) => ({ ...prev, poster: selectedImage }));
      } else if (imageMode === "gallery") {
        setGalleryImage((prev) => ({
          ...prev,
          otherImages: [...prev?.otherImages, selectedImage],
        }));
      }
    }
  }, [selectedImage]);
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>Open</DrawerTrigger>
        <DrawerContent className="h-full">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              {editValue ? "ویرایش نمایش" : "ایجاد نمایش جدید"}
            </DrawerTitle>
          </DrawerHeader>
          <main className="grid overflow-y-auto flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                id="show-form"
                className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
              >
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <ShowDetail
                    description={description}
                    setDescription={setDescription}
                    register={register}
                  />
                  <ShowTime
                    showTimes={showTimes}
                    setShowTimes={setShowsTimes}
                    commandValue={commandValue}
                    setCommandValue={setCommandValue}
                  />
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <ShowPeople
                    selectedPeopleByRole={selectedPeopleByRole}
                    setSelectedPeopleByRole={setSelectedPeopleByRole}
                  />
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">تصاویر </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <p>پوستر نمایش</p>

                        <Card>
                          <button
                            type="button"
                            onClick={() => {
                              setIsOpenMediaModal(true);
                              setImageMode("avatar");
                            }}
                            className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                          >
                            {galleryImage?.poster ? (
                              <Image
                                alt="Product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="300"
                                crossOrigin="anonymous"
                                src={`${config.fileURL}/${galleryImage.poster?.url}`}
                                width="300"
                              />
                            ) : (
                              <Upload className="h-4 w-4 text-muted-foreground" />
                            )}

                            <span className="sr-only">Upload</span>
                          </button>
                          {galleryImage.poster && (
                            <div className="flex justify-center">
                              <Button
                                type="button"
                                onClick={() =>
                                  setGalleryImage((prev) => ({
                                    ...prev,
                                    poster: null,
                                  }))
                                }
                                size="icon"
                                className="h-5 w-5"
                                variant="ghost"
                              >
                                <XIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </Card>

                        <p>آلبوم</p>
                        <div className="grid grid-cols-3 gap-2">
                          {galleryImage?.otherImages.map((image) => (
                            <Card>
                              <button type="button">
                                <Image
                                  alt="show poster"
                                  className="aspect-square w-full rounded-md object-cover"
                                  height="84"
                                  src={`${config.fileURL}/${image.url}`}
                                  width="84"
                                />
                              </button>
                              <div className="flex justify-center">
                                <Button
                                  type="button"
                                  size="icon"
                                  className="h-5 w-5"
                                  variant="ghost"
                                >
                                  <XIcon
                                    onClick={() =>
                                      setGalleryImage((prev) => ({
                                        ...prev,
                                        otherImages: prev.otherImages.filter(
                                          (item) => item.id !== image.id
                                        ),
                                      }))
                                    }
                                    className="h-4 w-4"
                                  />
                                </Button>
                              </div>
                            </Card>
                          ))}
                          <div>
                            <button
                              type="button"
                              onClick={() => {
                                setIsOpenMediaModal(true);
                                setImageMode("gallery");
                              }}
                              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                            >
                              <Upload className="h-4 w-4 text-muted-foreground" />

                              <span className="sr-only">Upload</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </form>

              <DrawerFooter className="mb-2 p-0">
                <Button type="submit" form="show-form">
                  آپلود
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">لغو</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </main>
          <SelectImageHandler
            isOpen={isOpenMediaModal}
            setOpen={setIsOpenMediaModal}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UploadShow;
