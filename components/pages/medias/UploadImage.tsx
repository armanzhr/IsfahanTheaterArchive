import { PhotoIcon } from "@heroicons/react/24/outline";

import React, { SetStateAction, useState } from "react";
import { toast } from "sonner";
import UploadMediaPopover from "./UploadMediaPopover";
import { useMediaStore } from "@/service/store/useMediaStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const UploadImage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<SetStateAction<any>>("");
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const { isLoadingMedia, createMedia } = useMediaStore();

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
    displayPreview(file);
  };

  const displayPreview = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSrc(reader?.result);
    };
  };

  const handleCancelUpload = () => {
    setPreviewSrc("");
    setSelectedFile(null);
  };
  return (
    <div
      className={`relative border-2 ${
        isDragging ? "border-primary-500" : "border-gray-300"
      } border-dashed rounded-lg p-6 w-1/2 h-1/2 flex items-center justify-center`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      id="dropzone"
    >
      {!previewSrc && (
        <div>
          <input
            type="file"
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
            <p className="mt-1 text-xs text-gray-500">
              فرمت میتواند JPG یا PNG باشد
            </p>
          </div>
        </div>
      )}

      {previewSrc && (
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <img
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover max-w-40 max-h-40 "
            height="300"
            src={previewSrc}
            width="300"
          />
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
