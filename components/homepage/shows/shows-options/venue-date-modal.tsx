"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import React, { useEffect, useState } from "react";
import VenueDateContainer from "./venue-date-container";

const VenueDateModal = ({
  open,
  setOpen,
  selectedTab,
}: {
  open: boolean;
  setOpen: (status: boolean) => void;
  selectedTab: "venue" | "date";
}) => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" && window.innerWidth > 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-start mt-2">
              فیلتر نمایش ها
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <VenueDateContainer selectedTab={selectedTab} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Make</DrawerDescription>
        </DrawerHeader>
        <VenueDateContainer selectedTab={selectedTab} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default VenueDateModal;
