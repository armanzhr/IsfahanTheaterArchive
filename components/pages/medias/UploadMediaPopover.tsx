import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaStore } from "@/service/store/useMediaStore";
import { Media } from "@/utils/types";
import { UploadIcon, XIcon } from "lucide-react";
import React, { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UploadMediaPopover = ({
  children,
  selectedImage,
}: {
  children: React.ReactNode;
  selectedImage?: Media;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const { isLoadingMedia, updateMedia } = useMediaStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNewImage, setSelectedNewImage] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<SetStateAction<any>>();
  const onSubmit = async (data: Media) => {
    if (selectedImage) {
      const model = new FormData();

      model.append("Title", data.title);
      model.append("Alt", data.alt ?? " ");
      if (selectedNewImage) {
        model.append("File", selectedNewImage);
      }
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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    displayPreview(file);
  };

  const displayPreview = (file: File) => {
    setSelectedNewImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSrc(reader?.result);
    };
  };
  const handleDeselectImage = () => {
    setSelectedNewImage(null);
  };
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
              <div>
                <Label
                  role="button"
                  className="w-full flex items-center justify-center h-10 rounded-md bg-secondary"
                >
                  <input
                    type="file"
                    hidden
                    className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                    onChange={handleFileChange}
                    accept="image/*"
                    id="file-upload"
                  />
                  <p>تغییر تصویر </p>
                  <UploadIcon className="h-5 w-5 mr-3" />
                </Label>
              </div>

              {selectedNewImage && (
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label>تصویر جدید : </Label>
                  <Card className="relative col-span-2">
                    <img
                      alt="تصویر جدید"
                      className="aspect-square rounded-md object-cover "
                      height="300"
                      src={previewSrc}
                      width="300"
                    />

                    <CardFooter className="p-0 text-center w-full justify-start absolute bottom-0">
                      <Button
                        onClick={handleDeselectImage}
                        className="h-6 w-6"
                        size="icon"
                        type="button"
                      >
                        <XIcon className="h-5 w-5" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
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
