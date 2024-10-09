"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRolesStore } from "@/service/store/useRolesStore";
import { Media, Show, Venues } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, XIcon } from "lucide-react";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { cn } from "@/utils/cn";
var moment = require("moment-jalaali");
const UploadShow = ({
  open,
  setOpen,
  editValue,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  editValue?: Show | null;
}) => {
  const { handleSubmit, register, watch, setValue, reset } = useForm();
  const [galleryImage, setGalleryImage] = useState<{
    poster: Media | null;
    otherImages: Media[];
  }>({ poster: null, otherImages: [] });
  const [isOpenMediaModal, setIsOpenMediaModal] = useState(false);
  const { selectedImage, setSelectedImage, getMedia, media } = useMediaStore();
  const handleCloseMediaModal = () => {
    setIsOpenMediaModal(false);
  };
  const { createShows, updateShows, getShowInfo, showInfo } = useShowsStore();
  const [commandValue, setCommandValue] = useState<Venues | null>();

  const title = watch("title");
  const [description, setDescription] = useState<Content>("");
  const [imageMode, setImageMode] = useState<"avatar" | "gallery">();
  const [showTimes, setShowsTimes] = useState<
    {
      id: number;
      venueId: number;
      startDate: string;
      endDate: string;
      showTimeStart: string;
    }[]
  >([]);
  const [selectedPeopleByRole, setSelectedPeopleByRole] = useState<any>({}); // State for tracking selected people per role
  const [isGettingShow, setIsGettingShow] = useState(true);
  const { getRoles, roles } = useRolesStore();
  const { getVenues, venues } = useVenuesStore();
  const { listMedias } = useMediaStore();

  useEffect(() => {
    const result: {
      [key: number]: {
        id?: number;
        roleId?: number;
        firstName?: string;
        lastName?: string;
      }[];
    } = {};

    showInfo?.showPeopleRoles?.forEach((item) => {
      if (!result[item.roleId]) {
        result[item.roleId] = [];
      }
      result[item.roleId].push(item);
    });

    setValue("title", showInfo?.title);
    setValue("slug", showInfo?.slug);
    setDescription(showInfo?.description as any);
    setShowsTimes(showInfo?.showTimes as any);
    setGalleryImage(
      (prev) =>
        ({
          ...prev,
          poster: listMedias?.find(
            (item) => item.id === showInfo?.posterImageId
          ),
          otherImages: listMedias?.filter((item) =>
            showInfo?.imagesIDs.includes(item.id)
          ),
        } as any)
    );
    setSelectedPeopleByRole(result);
    console.log(result);
  }, [showInfo]);

  // Generate slug when title changes
  useEffect(() => {
    const slug = `${title}`.trim().replace(/\s+/g, "-");
    if (!title) {
      setValue("slug", null);
    } else {
      setValue("slug", slug);
    }
  }, [title, setValue]);

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
  const fetchShowInfo = async () => {
    setIsGettingShow(true);

    try {
      const res = await getShowInfo(editValue?.id!);
      setIsGettingShow(false);
    } catch (error) {
      toast.error("خطا در دریافت اطلاعات نمایش");
      setOpen(false);
      setIsGettingShow(false);
    }
  };
  useEffect(() => {
    console.log("chenged");
    if (!venues) {
      fetchVenues();
    }
    if (!roles) {
      fetchRoles();
    }
    fetchShowInfo();
  }, [editValue?.id]);
  useEffect(() => {
    console.log(isGettingShow);
  }, [isGettingShow]);
  const onSubmit = async (data: any) => {
    const result: any = [];

    for (const [roleId, peopleIds] of Object.entries(selectedPeopleByRole)) {
      (peopleIds as any).forEach((personId: any) => {
        result.push({ roleId: parseInt(roleId), personId });
      });
    }

    const model = {
      posterImageId: galleryImage.poster?.id,
      title: data.title,
      slug: data.slug,
      description: description,
      metaDescription: "null",
      showTimes: showTimes,
      imageIds: galleryImage.otherImages?.map((item) => item.id),
      showPeopleRoles: result,
    };
    if (editValue) {
      toast.promise(
        async () => {
          try {
            await updateShows(editValue.id, model as any);
            resetFields();
            setOpen(false);
          } catch (error) {
            throw error;
          }
        },
        {
          loading: "در حال ویرایش نمایش ...",
          success: "نمایش با موفقیت ویرایش شد",
          error: "خطا در ویرایش نمایش",
        }
      );
    } else {
      toast.promise(
        async () => {
          try {
            await createShows(model as any);
            resetFields();
            setOpen(false);
          } catch (error) {
            throw error;
          }
        },
        {
          loading: "در حال ایجاد نمایش ...",
          success: "نمایش با موفقیت ایجاد شد",
          error: "خطا در ایجاد نمایش",
        }
      );
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    setSelectedImage(null);
    setImageMode(undefined);
  }, [galleryImage]);

  const resetFields = () => {
    reset();
    setDescription("");
    setShowsTimes([]);
    setSelectedPeopleByRole({});
    setGalleryImage({ poster: null, otherImages: [] });
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>Open</DrawerTrigger>
        <DrawerContent className="h-full">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              {editValue
                ? `ویرایش نمایش ${editValue.title}`
                : "ایجاد نمایش جدید"}
            </DrawerTitle>
          </DrawerHeader>
          {!isGettingShow ? (
            <main className="grid overflow-y-auto flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <form onSubmit={handleSubmit(onSubmit)} id="show-form">
                      <ShowDetail
                        description={description}
                        setDescription={setDescription}
                        register={register}
                      />
                    </form>
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
                                <img
                                  alt="Product image"
                                  className="aspect-square w-full rounded-md object-cover"
                                  height="300"
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
                            {galleryImage?.otherImages?.map((image) => (
                              <Card key={image.id}>
                                <button type="button">
                                  <img
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
                </div>

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
          ) : (
            <div className="flex items-center justify-center flex-col gap-3 h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("animate-spin")}
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <p>دریافت اطلاعات نمایش...</p>
            </div>
          )}

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
