import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaStore } from "@/service/store/useMediaStore";
import { Media, SelectedFile } from "@/utils/types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const UploadMediaModal = ({
  isOpen,
  setIsOpen,
  selectedFile,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedFile?: SelectedFile;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const { isLoadingMedia, selectedFiles, setSelectedFiles } = useMediaStore();
  const onSubmit = async (data: Media) => {
    console.log(data);
    setSelectedFiles(
      selectedFiles?.map((item) =>
        item.id === selectedFile?.id
          ? { ...item, alt: data.alt, title: data.title }
          : item
      )
    );
    setIsOpen(false);
  };
  useEffect(() => {
    console.log(selectedFile);
    setValue("alt", selectedFile?.alt);
    setValue("title", selectedFile?.title);
  }, [selectedFile]);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent
        title="ویرایش مشخصات تصویر"
        aria-describedby="edit image info"
        className="w-[340px]"
      >
        <DialogTitle>
          <p className="text-small font-bold text-foreground">
            ویرایش مشخصات تصویر
          </p>
        </DialogTitle>

        <div className="px-1 py-2 w-full">
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
      </DialogContent>
    </Dialog>
  );
};

export default UploadMediaModal;
