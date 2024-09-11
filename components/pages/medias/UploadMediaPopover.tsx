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
  const { register, handleSubmit, setValue } = useForm();
  const [isSelected, setIsSelected] = useState(false);
  const { isLoadingMedia, updateMedia, getMediasList, createMedia } =
    useMediaStore();
  const { setSelectedKey } = useMediaStore();
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit = async (data: Media) => {
    if (mode === "edit") {
      const model = {
        ...data,
      };
      if (selectedImage) {
        //mode === edit
        try {
          await updateMedia(selectedImage?.id, model);
          toast.success("رسانه با موفقیت ویرایش شد");
        } catch (error) {
          toast.error("خطا در ویرایش رسانه");
        }
        setIsOpen(false);
      }
    } else {
      //mode === upload
      const model = new FormData();

      model.append("files[0].Title", " ");
      model.append("files[0].Alt", " ");
      model.append("files[0].File", selectedFile!);

      try {
        await createMedia(model);
        toast.success("رسانه با موفقیت آپلود شد");
        setSelectedKey("images");
      } catch (error) {
        toast.error("خطا در آپلود رسانه");
      }
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (selectedImage) {
      setValue("alt", selectedImage.alt);
      setValue("title", selectedImage.title);
    } else if (selectedFile) {
      setIsSelected(true);
    }
  }, [selectedImage, selectedFile]);

  return (
    <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-[240px]">
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground">
            {mode === "edit" ? "ویرایش تصویر" : "آپلود تصویر"}
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  نام جایگزین
                </Label>
                <Input
                  defaultValue={""}
                  className="col-span-2"
                  {...register("alt")}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  عنوان*
                </Label>
                <Input className="col-span-2" {...register("title")} />
              </div>

              <Button
                disabled={isLoadingMedia}
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
