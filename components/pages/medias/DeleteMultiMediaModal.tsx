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

const DeleteMultiMedia = ({
  selectedMediasID,
  setSelectedMediasID,
  setMultiMediaSelectMode,
  open,
  setOpen,
}: {
  selectedMediasID: number[];
  setSelectedMediasID: (ID: number[]) => void;
  setMultiMediaSelectMode: (mode: boolean) => void;
  open: boolean;
  setOpen: (status: boolean) => void;
}) => {
  const { deleteMedia } = useMediaStore();
  const handleDeletePeople = async () => {
    toast.promise(
      async () => {
        try {
          selectedMediasID.map(async (item) => {
            await deleteMedia(item);
          });

          setSelectedMediasID([]);
          setMultiMediaSelectMode(false);
          setOpen(false);
        } catch (error) {
          throw error;
        }
      },
      {
        loading: "درحال حذف رسانه ها",
        success: "رسانه ها با موفقیت حذف شدند",
        error: "خطا در حذف رسانه ها",
      }
    );
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-4/5 lg:w-2/5 rounded">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start break-words truncate max-w-[300px]">
            حذف {selectedMediasID.length} رسانه
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            آیا از حذف رسانه های مورد نظر اطمینان دارید؟
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

export default DeleteMultiMedia;
