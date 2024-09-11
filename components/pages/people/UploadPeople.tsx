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
import { usePeopleStore } from "@/service/store/usePeopleStore";

import { People } from "@/utils/types";
import { PencilIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UploadPeople = ({
  open,
  setOpen,
  editValue,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  editValue?: People | null;
}) => {
  const { handleSubmit, register, watch, setValue, reset } = useForm();
  const { isLoadingPeople, createPeople, updatePeople } = usePeopleStore();
  const firstName = watch("firstName");
  const lastName = watch("lastName");

  // Generate slug when firstName or lastName changes
  useEffect(() => {
    const slug = `${firstName} ${lastName}`.trim().replace(/\s+/g, "-");
    if (!firstName && !lastName) {
      setValue("slug", null);
    } else {
      setValue("slug", slug);
    }
  }, [firstName, lastName, setValue]);
  useEffect(() => {
    setValue("firstName", editValue?.firstName);
    setValue("lastName", editValue?.lastName);
    setValue("slug", editValue?.slug);
    setValue("biography", editValue?.biography);
  }, [editValue]);

  const onSubmit = async (data: any) => {
    if (editValue) {
      try {
        await updatePeople(editValue.id, data);
        toast.success("کاربر با موفقیت ویرایش شد");
        reset();
        setOpen(false);
      } catch (error) {
        toast.error("خطا در ویرایش کاربر");
      }
    } else {
      try {
        await createPeople(data);
        toast.success("کاربر با موفقیت اضافه شد");
        reset();
        setOpen(false);
      } catch (error) {
        toast.error("خطا در ایجاد کاربر");
      }
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-center mt-3">
            {editValue ? "ویرایش کاربر" : "ایجاد کاربر جدید"}
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                *نام
              </Label>
              <Input
                id="firstName"
                className="col-span-3"
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                *نام خانوادگی
              </Label>
              <Input
                id="lastName"
                className="col-span-3"
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                *نامک
              </Label>
              <Input
                id="lastName"
                className="col-span-3"
                {...register("slug", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="biography" className="text-right">
                بیوگرافی
              </Label>
              <Textarea
                {...register("biography")}
                id="biography"
                className="col-span-3 h-32 resize-none"
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

export default UploadPeople;
