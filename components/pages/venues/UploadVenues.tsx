import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import { Venues } from "@/utils/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UploadVenues = ({
  open,
  setOpen,
  editValue,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  editValue?: Venues | null;
}) => {
  const { handleSubmit, register, watch, setValue, reset } = useForm();
  const { isLoadingVenues, createVenues, updateVenues } = useVenuesStore();

  useEffect(() => {
    setValue("name", editValue?.name);
    setValue("adress", editValue?.address);
  }, [editValue]);

  const onSubmit = async (data: any) => {
    if (editValue) {
      try {
        await updateVenues(editValue.id, data);
        toast.success("محل اجرا با موفقیت ویرایش شد");
        reset();
        setOpen(false);
      } catch (error) {
        toast.error("خطا در ویرایش کاربر");
      }
    } else {
      try {
        await createVenues(data);
        toast.success("محل اجرا با موفقیت اضافه شد");
        reset();
        setOpen(false);
      } catch (error) {
        toast.error("خطا در ایجاد محل اجرا");
      }
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-center mt-3">
            {editValue ? "ویرایش محل اجرا" : "ایجاد محل اجرا"}
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <SheetFooter>
            <Button type="submit">{editValue ? "ویرایش" : "ایجاد"}</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UploadVenues;
