"use client";
import DeleteMedia from "@/components/pages/medias/DeleteMediaModal";
import MediaDetailBody from "@/components/pages/medias/MediaDetailBody";
import MediaDetailFooter from "@/components/pages/medias/MediaDetailFooter";
import MediaDetailModal from "@/components/pages/medias/MediaDetailModal";
import UploadImage from "@/components/pages/medias/UploadImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import config from "@/config";
import { useMediaStore } from "@/service/store/useMediaStore";
import { cn } from "@/utils/cn";
import { Media } from "@/utils/types";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DeleteMultiMedia from "./DeleteMultiMediaModal";

const Medias = ({ mode }: { mode: "edit" | "view" }) => {
  const { getMediasList, selectedKey, setSelectedKey, listMedias } =
    useMediaStore();
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMultiDelete, setIsOpenMultiDelete] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<Media[] | null>();
  const [selectedMediasID, setSelectedMediasID] = useState<number[]>([]);
  const [multiMediaSelectMode, setMultiMediaSelectMode] = useState(false);

  const handleFilterItems = () => {
    setFilteredItems(
      listMedias?.filter((item) => item.title.includes(searchInputValue))
    );
  };

  useEffect(() => {
    handleFilterItems();
  }, [searchInputValue]);

  const onOpenChange = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768); //
    };

    // Set initial size
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGetMediasList = async () => {
    await getMediasList();
  };
  useEffect(() => {
    setFilteredItems(listMedias);
    if (!listMedias) {
      handleGetMediasList();
    } else {
      setSelectedImage(
        (prev) => listMedias?.filter((items) => items.id === prev?.id)[0]
      );
    }
  }, [listMedias]);

  const handleSelectMedia = (item: Media) => {
    setSelectedImage(item);
    onOpenChange();
  };
  const handleCheckboxChange = (imageId: number) => {
    setSelectedMediasID((prevSelected) => {
      if (prevSelected.includes(imageId)) {
        // اگر چک‌باکس قبلاً انتخاب شده بود، آن را از لیست حذف کن
        return prevSelected.filter((id) => id !== imageId);
      } else {
        // اگر چک‌باکس انتخاب نشده بود، آن را به لیست اضافه کن
        return [...prevSelected, imageId];
      }
    });
  };

  const handleMultiMediaSelectMode = () => {
    setMultiMediaSelectMode((prev) => !prev);
    setSelectedMediasID([]);
    setSelectedImage(null);
  };

  return (
    <Tabs
      className="flex flex-col items-end h-[calc(100vh-100px)]"
      defaultValue="images"
      value={selectedKey}
      onValueChange={setSelectedKey}
    >
      <TabsList>
        <TabsTrigger value="images">رسانه ها</TabsTrigger>
        <TabsTrigger value="upload">آپلود رسانه</TabsTrigger>
      </TabsList>
      <TabsContent value="images" className=" h-full w-full">
        <div className="h-[calc(100vh-150px)] grid grid-cols-10 gap-3">
          <ScrollArea
            dir="rtl"
            className="col-span-10 lg:col-span-8 md:col-span-7"
          >
            <div className="flex gap-3 items-center">
              <Input
                dir="rtl"
                className="border focus-visible:ring-transparent w-full lg:w-60"
                placeholder="جست و جو بر اساس عنوان"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value as any)}
              />
              {mode === "edit" && (
                <Button onClick={handleMultiMediaSelectMode} variant="outline">
                  {multiMediaSelectMode ? "لغو انتخاب" : "انتخاب گروهی"}
                </Button>
              )}
              {multiMediaSelectMode && selectedMediasID.length > 0 && (
                <Button onClick={() => setIsOpenMultiDelete(true)}>
                  {" "}
                  <Trash2Icon className="h-4 w-4 ml-2" /> حذف{" "}
                  {selectedMediasID.length} رسانه{" "}
                </Button>
              )}
            </div>
            <div className="grid lg:grid-cols-7 grid-cols-3 gap-4 p-3">
              {filteredItems?.map((item, index) => (
                <Card
                  className={cn(
                    multiMediaSelectMode
                      ? selectedMediasID.includes(item.id)
                        ? "opacity-100"
                        : "opacity-50"
                      : selectedImage &&
                          (item === selectedImage
                            ? "opacity-100"
                            : "opacity-50"),
                    "ease-out duration-300 cursor-pointer hover:opacity-100"
                  )}
                  key={index}
                >
                  <CardContent className="overflow-visible p-0 relative">
                    <img
                      width={200}
                      height={200}
                      alt={item.title}
                      // crossOrigin="anonymous"
                      className="aspect-square w-full rounded-md object-cover"
                      src={`${config.fileURL}/${item.url}`}
                      onClick={() => handleSelectMedia(item)}
                      // unoptimized
                    />
                    {multiMediaSelectMode && (
                      <div className="absolute inset-x-0 bottom-0 m-2 flex justify-start">
                        <Checkbox
                          className="w-6 h-6 border-2 border-white"
                          checked={selectedMediasID.includes(item.id)}
                          onCheckedChange={() => handleCheckboxChange(item.id)}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {isMediumScreen ? (
            <Card className="h-full hidden md:flex flex-col justify-between lg:col-span-2 md:col-span-3">
              {selectedImage ? (
                <>
                  <CardContent className="pt-6">
                    <MediaDetailBody
                      mode={mode}
                      selectedImage={selectedImage}
                    />
                  </CardContent>
                  <CardFooter className="w-full flex gap-3">
                    <MediaDetailFooter
                      mode={mode}
                      selectedImage={selectedImage}
                      setOpenDeleteModal={setOpenDeleteModal}
                    />
                  </CardFooter>
                </>
              ) : (
                <div className=" h-full flex justify-center items-center text-sm">
                  <p>یک عکس را انتخاب کنید</p>
                </div>
              )}
            </Card>
          ) : (
            <MediaDetailModal
              mode={mode}
              selectedImage={selectedImage!}
              setOpenDeleteModal={setOpenDeleteModal}
              onOpenChange={onOpenChange}
              isOpen={isOpen}
            />
          )}
          <DeleteMedia
            media={selectedImage!}
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
          ></DeleteMedia>
          <DeleteMultiMedia
            open={isOpenMultiDelete}
            setOpen={setIsOpenMultiDelete}
            selectedMediasID={selectedMediasID}
            setSelectedMediasID={setSelectedMediasID}
            setMultiMediaSelectMode={setMultiMediaSelectMode}
          />
        </div>
      </TabsContent>
      <TabsContent
        className="h-full w-full flex items-center justify-center"
        value="upload"
      >
        <UploadImage />
      </TabsContent>
    </Tabs>
  );
};

export default Medias;
