import config from "@/config";
import { Media } from "@/utils/types";
import Image from "next/image";
import React from "react";

const MediaDetailBody = ({
  selectedImage,
  mode,
}: {
  selectedImage: Media;
  mode: "view" | "edit";
}) => {
  return (
    <>
      <Image
        width={300}
        height={300}
        alt={selectedImage?.alt}
        crossOrigin="anonymous"
        className="object-cover"
        src={`${config.fileURL}/${selectedImage.url}`}
      />
      <div className="text-start text-sm max-h-[100px]">
        <h6>عنوان : {selectedImage?.title}</h6>
        <p> alt : {selectedImage?.alt}</p>
      </div>
    </>
  );
};

export default MediaDetailBody;
