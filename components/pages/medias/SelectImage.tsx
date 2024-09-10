import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import React from "react";
import Medias from "./Media";

const SelectImageHandler = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="m-0">
        <>
          <DialogHeader className="flex flex-col gap-1">
            انتخاب فایل
          </DialogHeader>

          <Medias mode="view" />
        </>
      </DialogContent>
    </Dialog>
  );
};

export default SelectImageHandler;
