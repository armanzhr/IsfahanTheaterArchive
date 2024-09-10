"use client";
import DeleteMedia from "@/components/pages/medias/DeleteMediaModal";
import MediaDetailBody from "@/components/pages/medias/MediaDetailBody";
import MediaDetailFooter from "@/components/pages/medias/MediaDetailFooter";
import MediaDetailModal from "@/components/pages/medias/MediaDetailModal";
import UploadImage from "@/components/pages/medias/UploadImage";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
      <TabsContent value="images" className="bg-red-300 h-full w-full ">
        <Card>
          <CardContent>
            <div className=" flex h-full">
              {listMedias.length > 0 ? (
                <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 md:w-3/5 w-full lg:w-3/4 overflow-y-auto">
                  {listMedias.map((item, index) => (
                    <Card
                      className={`h-[140px] ${
                        selectedImage &&
                        (item === selectedImage ? "opacity-100" : "opacity-50")
                      }`}
                      key={index}
                      onClick={() => handleSelectMedia(item)}
                    >
                      <CardContent className="overflow-visible p-0">
                        <Image
                          width={300}
                          height={300}
                          alt={item.title}
                          crossOrigin="anonymous"
                          className="object-cover"
                          src={`${config.fileURL}/${item.url}`}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="h-full text-sm w-3/4 flex items-center justify-center">
                  <p>
                    رسانه ای وجود ندارد . لطفا ابتدا از بخش آپلود رسانه ، رسانه
                    خود را آپلود نمایید
                  </p>
                </div>
              )}

              {isMediumScreen ? (
                <div className=" hidden md:block md:w-2/5 lg:w-1/4 ">
                  <Card className="h-full">
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
                </div>
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
          </CardContent>
        </Card>
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
