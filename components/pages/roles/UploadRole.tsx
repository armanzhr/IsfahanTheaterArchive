import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

import { useRolesStore } from "@/service/store/useRolesStore";

import { People, Roles } from "@/utils/types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UploadRole = ({
  open,
  setOpen,
  editValue,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  editValue?: Roles | null;
}) => {
  const { handleSubmit, register, setValue, reset } = useForm();
  const { createRole, updateRole } = useRolesStore();

  useEffect(() => {
    setValue("name", editValue?.name);
  }, [editValue]);

  const onSubmit = async (data: any) => {
    if (editValue) {
      try {
        await updateRole(editValue.id, data);
        toast.success("نقش با موفقیت ویرایش شد");
        reset();
        setOpen(false);
      } catch (error) {
        toast.error("خطا در ویرایش نقش");
      }
    } else {
      try {
        await createRole(data);
        toast.success("نقش با موفقیت اضافه شد");
        reset();
        setOpen(false);
      } catch (error) {
        toast.error("خطا در ایجاد نقش");
      }
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-center mt-3">
            {editValue ? "ویرایش نقش" : "ایجاد نقش جدید"}
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                *نام نقش
              </Label>
              <Input
                id="firstName"
                className="col-span-3"
                {...register("name", { required: true })}
              />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">{editValue ? "ویرایش" : "ایجاد"}</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UploadRole;
