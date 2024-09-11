"use client";
import DeleteMedia from "@/components/pages/medias/DeleteMediaModal";
import MediaDetailBody from "@/components/pages/medias/MediaDetailBody";
import MediaDetailFooter from "@/components/pages/medias/MediaDetailFooter";
import MediaDetailModal from "@/components/pages/medias/MediaDetailModal";
import UploadImage from "@/components/pages/medias/UploadImage";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import config from "@/config";
import { useMediaStore } from "@/service/store/useMediaStore";
import { Media } from "@/utils/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Medias = ({ mode }: { mode: "edit" | "view" }) => {
  const { getMediasList, selectedKey, setSelectedKey, listMedias } =
    useMediaStore();
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    handleGetMediasList();
  }, []);

  const handleSelectMedia = (item: Media) => {
    setSelectedImage(item);
    onOpenChange();
  };

  return (
    <Tabs
      className="flex flex-col items-end h-[calc(100vh-100px)]"
      defaultValue="images"
      value={selectedKey}
      onValueChange={setSelectedKey}
    >
      <TabsList>
        <TabsTrigger value="images">تصاویر</TabsTrigger>
        <TabsTrigger value="upload">آپلود تصویر</TabsTrigger>
      </TabsList>
      <TabsContent value="images" className=" h-full w-full ">
        <div className="h-[calc(100vh-150px)] grid grid-cols-10 gap-3">
          <ScrollArea className="col-span-8">
            <Card className=" grid grid-cols-7 gap-4 p-3">
              {listMedias.map((item, index) => (
                <Card
                  className={`${
                    selectedImage &&
                    (item === selectedImage ? "opacity-100" : "opacity-50")
                  }`}
                  key={index}
                  onClick={() => handleSelectMedia(item)}
                >
                  <CardContent className="overflow-visible p-0">
                    <Image
                      width={200}
                      height={200}
                      alt={item.title}
                      crossOrigin="anonymous"
                      className="aspect-square w-full rounded-md object-cover"
                      src={`${config.fileURL}/${item.url}`}
                    />
                  </CardContent>
                </Card>
              ))}
            </Card>
          </ScrollArea>

          {isMediumScreen ? (
            <Card className="h-full hidden md:block col-span-2">
              {selectedImage ? (
                <>
                  <CardContent>
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
              selectedImage={selectedImage!}
              setOpenDeleteModal={setOpenDeleteModal}
              onOpenChange={onOpenChange}
              isOpen={isOpen}
            />
          )}
          {/* <DeleteMedia></DeleteMedia> */}
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
