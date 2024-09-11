import { useMediaStore } from "@/service/store/useMediaStore";
import { Media } from "@/utils/types";
import React from "react";
import UploadMediaPopover from "./UploadMediaPopover";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

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
      <Button
        className="w-full"
        onClick={() => setOpenDeleteModal(true)}
        variant={"outline"}
        // className="w-full"
      >
        حذف تصویر
        <Trash className="w-4 h-4 ml-1" />
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
