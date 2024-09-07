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
import { useVenuesStore } from "@/service/store/useVenuesStore";
import { People, Venues } from "@/utils/types";
import { TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const DeleteVenues = ({
  venue,
  setOpen,
  open,
}: {
  venue: Venues;
  setOpen: (status: boolean) => void;
  open: boolean;
}) => {
  const { deleteVenues } = useVenuesStore();
  const handleDeleteVenue = async () => {
    try {
      await deleteVenues(venue.id);
      toast.error("محل اجرا با موفقیت حذف شد");
      setOpen(false);
    } catch (error) {
      toast.error("خطا در حذف محل اجرا");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-4/5 lg:w-2/5 rounded">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            حذف {venue.name}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            آیا از حذف محل اجرای مورد نظر اطمینان دارید؟
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="md:gap-2">
          <AlertDialogCancel className="">لفو</AlertDialogCancel>
          <Button onClick={() => handleDeleteVenue()}>حذف</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteVenues;
