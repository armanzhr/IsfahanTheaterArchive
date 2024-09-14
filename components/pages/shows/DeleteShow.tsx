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
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { useRolesStore } from "@/service/store/useRolesStore";
import { useShowsStore } from "@/service/store/useShowsStore";
import { People, Roles, Show } from "@/utils/types";
import { TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const DeleteShow = ({
  show,
  setOpen,
  open,
}: {
  show: Show;
  setOpen: (status: boolean) => void;
  open: boolean;
}) => {
  const { deleteShows } = useShowsStore();
  const handleDeleteShow = async () => {
    try {
      await deleteShows(show.id);
      toast.error("نمایش با موفقیت حذف شد");
      setOpen(false);
    } catch (error) {
      toast.error("خطا در حذف نمایش");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-4/5 lg:w-2/5 rounded">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            حذف {show?.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            آیا از حذف نمایش مورد نظر اطمینان دارید؟
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="md:gap-2">
          <AlertDialogCancel className="">لفو</AlertDialogCancel>
          <Button onClick={() => handleDeleteShow()}>حذف</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteShow;
