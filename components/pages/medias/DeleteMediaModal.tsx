import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMediaStore } from "@/service/store/useMediaStore";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { Media, People } from "@/utils/types";
import { TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const DeleteMedia = ({
  media,
  open,
  setOpen,
}: {
  media: Media;
  open: boolean;
  setOpen: (status: boolean) => void;
}) => {
  const { deleteMedia } = useMediaStore();
  const handleDeletePeople = async () => {
    try {
      await deleteMedia(media.id);
      toast.error("تصویر با موفقیت حذف شد");
      setOpen(false);
    } catch (error) {
      toast.error("خطا در حذف تصویر");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-4/5 lg:w-2/5 rounded">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start break-words truncate max-w-[300px]">
            حذف تصویر {media?.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            آیا از حذف تصویر مورد نظر اطمینان دارید؟
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="md:gap-2">
          <AlertDialogCancel className="">لفو</AlertDialogCancel>
          <Button onClick={() => handleDeletePeople()}>حذف</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMedia;
