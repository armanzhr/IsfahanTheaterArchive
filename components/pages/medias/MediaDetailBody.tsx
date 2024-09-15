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
  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);
  return (
    <>
      <img
        width={300}
        height={300}
        alt={selectedImage?.alt}
        className="object-cover max-h-[300px] rounded-md"
        src={`${config.fileURL}/${selectedImage.url}`}
      />
      <div dir="rtl" className="flex flex-col mt-3 text-sm max-h-[100px]">
        <h6>
          <strong>عنوان</strong> :{" "}
          {selectedImage.title ? selectedImage.title : "---"}
        </h6>
        <p>
          {" "}
          <strong>متن جایگزین </strong>:{" "}
          {selectedImage.alt ? selectedImage.title : "---"}
        </p>
      </div>
    </>
  );
};

export default MediaDetailBody;
