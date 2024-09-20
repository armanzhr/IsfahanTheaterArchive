import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import { Venues } from "@/utils/types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UploadVenueForm = ({
  open,
  setOpen,
  editValue,
}: {
  editValue?: Venues | null;
  open: boolean;
  setOpen: (data: boolean) => void;
}) => {
  const { handleSubmit, register, setValue, reset } = useForm();
  const { createVenues, updateVenues } = useVenuesStore();

  useEffect(() => {
    setValue("name", editValue?.name);
    setValue("address", editValue?.address);
  }, [editValue]);

  const onSubmit = async (data: any) => {
    if (editValue) {
      toast.promise(
        async () => {
          try {
            await updateVenues(editValue.id, data);
            reset();
            setOpen(false);
          } catch (error) {
            throw error;
          }
        },
        {
          loading: "در حال ویرایش محل اجرا...",
          success: "محل اجرا با موفقیت ویرایش شد",
          error: "خطا در ویرایش محل اجرا",
        }
      );
    } else {
      toast.promise(
        async () => {
          try {
            await createVenues(data);
            reset();
            setOpen(false);
          } catch (error) {
            throw error;
          }
        },
        {
          loading: "در حال ایجاد محل اجرا...",
          success: "محل اجرا با موفقیت ایجاد شد",
          error: "خطا در ایجاد محل اجرا",
        }
      );
    }
  };
  return (
    <>
      <form id="venue-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              *نام
            </Label>
            <Input
              id="firstName"
              className="col-span-3"
              {...register("name", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              *محل اجرا
            </Label>
            <Textarea
              {...register("address", { required: true })}
              id="address"
              className="col-span-3 h-32 resize-none"
            />
          </div>
        </div>
      </form>
      <div className="grid grid-cols-4">
        <div></div>
        <Button form="venue-form" className="col-span-3" type="submit">
          {editValue ? "ویرایش" : "ایجاد"}
        </Button>
      </div>
    </>
  );
};

export default UploadVenueForm;
