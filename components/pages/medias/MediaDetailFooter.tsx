import { useMediaStore } from "@/service/store/useMediaStore";
import { Media } from "@/utils/types";
import React from "react";
import UploadMediaPopover from "./UploadMediaPopover";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { PencilIcon } from "@heroicons/react/24/outline";

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
    <div className="flex flex-col w-full gap-3">
      <UploadMediaPopover mode="edit" selectedImage={selectedImage}>
        <Button variant="default" className="w-full">
          ویرایش
          <PencilIcon className="w-4 h-4 ml-1" />
        </Button>
      </UploadMediaPopover>
      <Button
        className="w-full"
        onClick={() => setOpenDeleteModal(true)}
        variant={"outline"}
        // className="w-full"
      >
        حذف تصویر
        <Trash className="w-4 h-4 ml-1" />
      </Button>
    </div>
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
