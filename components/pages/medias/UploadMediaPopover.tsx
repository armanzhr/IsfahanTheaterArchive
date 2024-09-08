import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const onSubmit = async (data: any) => {
    if (mode === "edit") {
      const model = {
        ...data,
        id: selectedImage?.id,
        access: isSelected ? "Public" : "Private",
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
      model.append("access", isSelected ? "Public" : "Private");
      model.append("title", data.title);
      model.append("alt", data.alt);
      model.append("description", data.description);
      model.append("file", selectedFile!);

      try {
        await createMedia(model);
        toast.success("رسانه با موفقیت آپلود شد");
        setSelectedKey("medias");
      } catch (error) {
        toast.error("خطا در آپلود رسانه");
      }
      setIsOpen(false);
    }
    await getMediasList();
  };
  useEffect(() => {
    if (selectedImage) {
      setValue("alt", selectedImage.alt);
      setValue("title", selectedImage.title);
    } else if (selectedFile) {
      setValue("title", selectedFile.name);
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
              <Input {...register("alt")} />
              <Input {...register("title")} />
              <Input {...register("description")} />

              <Button type="submit" color="primary" className="w-full">
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
