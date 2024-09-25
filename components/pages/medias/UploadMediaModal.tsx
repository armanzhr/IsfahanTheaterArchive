import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaStore } from "@/service/store/useMediaStore";
import { Media } from "@/utils/types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const UploadMediaModal = ({
  isOpen,
  setIsOpen,
  selectedFile,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedFile?: {
    title?: string;
    alt?: string;
    file: File;
    previewSrc: string;
  };
}) => {
  const { register, handleSubmit, setValue } = useForm();
  const { isLoadingMedia } = useMediaStore();
  const onSubmit = async (data: Media) => {};
  useEffect(() => {
    console.log(selectedFile);
    setValue("alt", selectedFile?.alt);
    setValue("title", selectedFile?.title);
  }, [selectedFile]);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="w-[340px]">
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground">
            ویرایش مشخصات تصویر
          </p>
          <form onSubmit={handleSubmit(onSubmit as any)}>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  عنوان
                </Label>
                <Input className="col-span-2" {...register("title")} />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  متن جایگزین
                </Label>
                <Input
                  defaultValue={""}
                  className="col-span-2"
                  {...register("alt")}
                />
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
      </DialogContent>
    </Dialog>
  );
};

export default UploadMediaModal;
