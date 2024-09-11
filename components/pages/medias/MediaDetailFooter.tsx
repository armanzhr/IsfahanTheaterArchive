import { useMediaStore } from "@/service/store/useMediaStore";
import { Media } from "@/utils/types";
import React from "react";
import UploadMediaPopover from "./UploadMediaPopover";
import { Button } from "@/components/ui/button";

const MediaDetailFooter = ({
  selectedImage,
  setOpenDeleteModal,
  mode,
}: {
  selectedImage: Media;
  setOpenDeleteModal: (bool: boolean) => void;
  mode: "view" | "edit";
}) => {
  const { setSelectedImage } = useMediaStore();
  const handleSelectImage = () => {
    setSelectedImage(selectedImage);
  };
  return mode === "edit" ? (
    <>
      <UploadMediaPopover mode="edit" selectedImage={selectedImage}>
        <Button color="warning" className="w-full">
          ویرایش
        </Button>
      </UploadMediaPopover>
      <Button
        onClick={() => setOpenDeleteModal(true)}
        variant={"outline"}
        // className="w-full"
      >
        حذف
      </Button>
    </>
  ) : (
    <>
      <Button
        onClick={() => handleSelectImage()}
        color="primary"
        className="w-full"
      >
        انتخاب
      </Button>
    </>
  );
};

export default MediaDetailFooter;
