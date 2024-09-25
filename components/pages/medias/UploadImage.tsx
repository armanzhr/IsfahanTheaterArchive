import { PhotoIcon } from "@heroicons/react/24/outline";

import React, { SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import UploadMediaPopover from "./UploadMediaPopover";
import { useMediaStore } from "@/service/store/useMediaStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface FileObject {
  title: string;
  alt: string;
  file: File;
  previewSrc: string | ArrayBuffer | null;
}

const UploadImage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<SetStateAction<any>>("");
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const { isLoadingMedia, createMedia } = useMediaStore();
  const [selectedFiles, setSelectedFiles] = useState<
    { title?: string; alt?: string; file: File; previewSrc: string }[] | null
  >();

  const convertFileListToObjects = (fileList: FileList) => {
    const readFileAsDataURL = (
      file: File
    ): Promise<string | ArrayBuffer | null> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const filesWithPreview = Array.from(fileList).map(async (file) => {
      const previewSrc = await readFileAsDataURL(file);

      return {
        title: file.name.split(".").slice(0, -1).join("."), // نام فایل بدون پسوند
        alt: file.name, // نام فایل به عنوان alt
        file: file, // خود فایل
        previewSrc: previewSrc, // پیش‌نمایش فایل
      };
    });

    // صبر می‌کنیم تا همه پرومیس‌ها حل شوند و در state ذخیره می‌کنیم
    Promise.all(filesWithPreview).then((formattedFilesArray) => {
      setSelectedFiles(formattedFilesArray);
    });
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    displayPreview(file);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const fileList = e.target.files;
    if (fileList) {
      convertFileListToObjects(fileList);
    }
    displayPreview(file);
  };

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  const displayPreview = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSrc(reader?.result);
    };
  };

  const handleCancelUpload = () => {
    setSelectedFiles(null);
  };
  return (
    <div
      className="w-full h-full flex items-center justify-center p-6"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      id="dropzone"
    >
      {!selectedFiles && (
        <div
          className={`relative border-2 ${
            isDragging ? "border-primary-500" : "border-gray-300"
          } border-dashed rounded-lg w-1/2 h-1/2 flex items-center justify-center`}
        >
          <input
            type="file"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
            onChange={handleFileChange}
            accept="image/*"
            id="file-upload"
          />
          <div className="text-center">
            <div className="h-full flex justify-center">
              <PhotoIcon width={30} />
            </div>

            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <label htmlFor="file-upload" className="relative cursor-pointer">
                <span>برای آپلود بکشید و رها کنید</span>
                <span className="text-primary-500"> یا انتخاب کنید</span>
              </label>
            </h3>
            <p dir="rtl" className="mt-1 text-xs text-gray-500">
              فرمت میتواند PNG یا JPG باشد
            </p>
          </div>
        </div>
      )}

      {selectedFiles && (
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {selectedFiles.map((item, index) => (
                <CarouselItem key={index}>
                  <p className="w-full text-right">{`فایل ${index + 1} از ${
                    selectedFiles.length
                  }`}</p>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover w-full h-full "
                        height="300"
                        src={item.previewSrc}
                        width="300"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex gap-2">
            <UploadMediaPopover mode="upload" selectedFile={selectedFile!}>
              <Button disabled={isLoadingMedia}>آپلود</Button>
            </UploadMediaPopover>
            <Button variant="outline" onClick={handleCancelUpload}>
              لغو
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
