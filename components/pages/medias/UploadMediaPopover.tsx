import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaStore } from "@/service/store/useMediaStore";
import { Media } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UploadMediaPopover = ({
  children,
  selectedImage,
  mode,
  selectedFile,
}: {
  children: React.ReactNode;
  selectedImage?: Media;
  mode: "upload" | "edit";
  selectedFile?: File;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const { isLoadingMedia, updateMedia } = useMediaStore();
  const { setSelectedKey } = useMediaStore();
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit = async (data: Media) => {
    if (selectedImage) {
      const model = new FormData();

      model.append("Title", data.title);
      model.append("Alt", data.alt ?? " ");
      //mode === edit
      toast.promise(
        async () => {
          try {
            await updateMedia(selectedImage?.id, model as any);

            setIsOpen(false);
          } catch (error) {
            throw error;
          }
        },
        {
          loading: "درحال ویرایش رسانه",
          success: "رسانه با موفقیت ویرایش شد",
          error: "خطا در حذف رسانه",
        }
      );
    }
  };
  useEffect(() => {
    reset();
    if (selectedImage) {
      setValue("alt", selectedImage.alt);
      setValue("title", selectedImage.title);
    }
  }, [selectedImage]);

  return (
    <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-[340px]">
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground">ویرایش تصویر</p>
          <form onSubmit={handleSubmit(onSubmit as any)}>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  عنوان
                </Label>
                <Input
                  className="col-span-2"
                  {...register("title", {
                    maxLength: {
                      message: "طول عنوان نمی تواند بیشتر از 100 کاراکتر باشد",
                      value: 100,
                    },
                  })}
                />
              </div>
              <p className="text-xs text-red-400">
                {errors?.title?.message?.toString()}
              </p>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  متن جایگزین
                </Label>
                <Input
                  defaultValue={""}
                  className="col-span-2"
                  {...register("alt", {
                    maxLength: {
                      value: 100,
                      message:
                        "طول متن جایگزین نمی تواند بیشتر از 100 کاراکتر باشد",
                    },
                  })}
                />
              </div>
              <p className="text-xs text-red-400">
                {errors?.alt?.message?.toString()}
              </p>
              <Button
                disabled={isLoadingMedia || !isValid}
                type="submit"
                color="primary"
                className="w-full"
              >
                ذخیره
              </Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UploadMediaPopover;
