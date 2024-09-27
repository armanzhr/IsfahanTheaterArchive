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
import { People } from "@/utils/types";
import { TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const DeletePeople = ({
  people,
  resetGetPeople,
}: {
  people: People;
  resetGetPeople: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const { deletePeople } = usePeopleStore();
  const handleDeletePeople = async () => {
    try {
      await deletePeople(people.id);
      toast.error("کاربر با موفقیت حذف شد");
      await resetGetPeople();
      setOpen(false);
    } catch (error) {
      toast.error("خطا در حذف کاربر");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="h-8 w-8"
          size="icon"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-4/5 lg:w-2/5 rounded">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            حذف {people.firstName} {people.lastName}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            آیا از حذف کاربر مورد نظر اطمینان دارید؟
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

export default DeletePeople;
