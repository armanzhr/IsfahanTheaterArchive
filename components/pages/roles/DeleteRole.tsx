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
import { People, Roles } from "@/utils/types";
import { TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const DeleteRole = ({ role }: { role: Roles }) => {
  const [open, setOpen] = useState(false);
  const { deleteRole } = useRolesStore();
  const handleDeletePeople = async () => {
    try {
      await deleteRole(role.id);
      toast.error("نقش با موفقیت حذف شد");
      setOpen(false);
    } catch (error) {
      toast.error("خطا در حذف نقش");
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
            حذف {role.name}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            آیا از حذف نقش مورد نظر اطمینان دارید؟
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

export default DeleteRole;
