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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PencilIcon, TrashIcon, XIcon } from "lucide-react";
import UploadMediaModal from "./UploadMediaModal";
import { SelectedFile } from "@/utils/types";

interface FileObject {
  title: string;
  alt: string;
  file: File;
  previewSrc: string | ArrayBuffer | null;
}

const UploadImage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<SetStateAction<any>>("");

  const [selectedFile, setSelectedFile] = useState<SelectedFile>();
  const {
    isLoadingMedia,
    createMedia,
    selectedFiles,
    setSelectedFiles,
    setSelectedKey,
  } = useMediaStore();
  const [isOpen, setIsOpen] = useState(false);

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

    const filesWithPreview = Array.from(fileList).map(async (file, index) => {
      const previewSrc = await readFileAsDataURL(file);

      return {
        id: index + 1,
        title: file.name.split(".").slice(0, -1).join(".").substring(0, 100), // نام فایل بدون پسوند
        alt: file.name.substring(0, 100), // نام فایل به عنوان alt
        file: file, // خود فایل
        previewSrc: previewSrc, // پیش‌نمایش فایل
      };
    });

    // صبر می‌کنیم تا همه پرومیس‌ها حل شوند و در state ذخیره می‌کنیم
    Promise.all(filesWithPreview).then((formattedFilesArray) => {
      setSelectedFiles(formattedFilesArray as any);
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
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const fileList = e.target.files;
    if (fileList) {
      convertFileListToObjects(fileList);
    }
  };

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  const handleCancelUpload = () => {
    setSelectedFiles(null);
  };
  const handleUploadFiles = async () => {
    toast.promise(
      async () => {
        try {
          const model = new FormData();
          selectedFiles?.map((item, index) => {
            model.append(`files[${index}].Title`, item?.title ?? " ");
            model.append(`files[${index}].Alt`, item.alt ?? " ");
            model.append(`files[${index}].File`, item.file);
          });

          await createMedia(model);
          setSelectedFiles(null);
          setSelectedKey("images");
        } catch (error) {
          throw error;
        }
      },
      {
        loading:
          selectedFiles?.length! > 1
            ? "درحال آپلود رسانه ها..."
            : "درحال آپلود رسانه ...",
        success:
          selectedFiles?.length! > 1
            ? "رسانه ها با موفقیت آپلود شد"
            : "رسانه با موفقیت آپلود شد",
        error:
          selectedFiles?.length! > 1
            ? "خطا در اپلود رسانه ها"
            : "خطا در اپلود رسانه",
      }
    );
  };
  const handleSelectMedia = (item: any) => {
    setSelectedFile(item);
    setIsOpen(true);
  };
  const handleDeselectFile = (item: any) => {
    setSelectedFiles(selectedFiles?.filter((file) => file.id !== item.id));
  };
  return (
    <div
      className="w-full h-full flex items-center justify-center p-6"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      id="dropzone"
    >
      {selectedFiles?.length ? (
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {selectedFiles.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="flex w-full items-center justify-between mb-2">
                    <div className="flex gap-1">
                      <Button
                        onClick={() => handleDeselectFile(item)}
                        className="h-8 w-8"
                        variant="outline"
                        size="icon"
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>

                      <Button
                        onClick={() => handleSelectMedia(item)}
                        className="h-8 w-8"
                        variant="outline"
                        size="icon"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className=" text-right">{`فایل ${index + 1} از ${
                      selectedFiles.length
                    }`}</p>
                  </div>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-0 ">
                      <div className="relative rounded-md">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-md object-cover w-full h-full "
                          height="300"
                          src={item.previewSrc}
                          width="300"
                        />

                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent rounded-md"></div>

                        <div
                          dir="rtl"
                          className="absolute mx-2 inset-x-0 bottom-2 text-right text-white"
                        >
                          <p className="truncate text-sm">
                            عنوان :{item.title}
                          </p>
                          <p className="truncate text-sm">
                            متن جایگزین :{item.alt}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex gap-2">
            <Button disabled={isLoadingMedia} onClick={handleUploadFiles}>
              آپلود
            </Button>
            <Button
              variant="outline"
              onClick={handleCancelUpload}
              disabled={isLoadingMedia}
            >
              لغو
            </Button>
          </div>
        </div>
      ) : (
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
      <UploadMediaModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedFile={selectedFile!}
      />
    </div>
  );
};

export default UploadImage;
