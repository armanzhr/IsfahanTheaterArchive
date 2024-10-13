import { ScrollArea } from "@/components/ui/scroll-area";
import config from "@/config";
import { Media } from "@/utils/types";
import Image from "next/image";
import React, { useEffect } from "react";

const MediaDetailBody = ({
  selectedImage,
  mode,
}: {
  selectedImage: Media;
  mode: "view" | "edit";
}) => {
  return (
    <>
      <img
        loading="lazy"
        width={300}
        height={300}
        alt={selectedImage?.alt}
        className="object-cover max-h-[300px] rounded-md"
        src={`${config.fileURL}/${selectedImage.url}`}
      />
      <div
        dir="rtl"
        className="flex flex-col mt-3 text-sm max-h-[200px] overflow-auto"
      >
        <p className="break-words text-right">
          <strong>عنوان</strong> :{" "}
          {selectedImage.title ? selectedImage.title : "---"}
        </p>
        <p className="break-words text-right">
          {" "}
          <strong>متن جایگزین </strong>:{" "}
          {selectedImage.alt ? selectedImage.alt : "---"}
        </p>
      </div>
    </>
  );
};

export default MediaDetailBody;
