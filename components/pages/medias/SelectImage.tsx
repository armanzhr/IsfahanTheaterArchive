import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import React from "react";
import Medias from "./Media";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";

const SelectImageHandler = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="m-0 p-3">
        <DrawerHeader className="text-center">
          <p className=" text-center font-bold">انتخاب فایل</p>
        </DrawerHeader>

        <Medias mode="view" />
      </DrawerContent>
    </Drawer>
  );
};

export default SelectImageHandler;
