import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { TooltipProvider } from "@/components/ui/tooltip";

import { useRolesStore } from "@/service/store/useRolesStore";

import { People, Roles } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UploadShow = ({
  open,
  setOpen,
  editValue,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  editValue?: Roles | null;
}) => {
  const { handleSubmit, register, watch, setValue, reset } = useForm();
  const { createRole, updateRole } = useRolesStore();
  const title = watch("title");
  const [test, setTest] = useState<string>("");
  useEffect(() => {
    console.log(test);
  }, [test]);
  // Generate slug when title changes
  useEffect(() => {
    const slug = `${title}`.trim().replace(/\s+/g, "-");
    if (!title) {
      setValue("slug", null);
    } else {
      setValue("slug", slug);
    }
  }, [title, setValue]);

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
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>Open</DrawerTrigger>
        <DrawerContent className="h-full">
          <DrawerHeader>
            <DrawerTitle>
              {editValue ? "ویرایش نمایش" : "ایجاد نمایش جدید"}
            </DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  *عنوان نمایش
                </Label>
                <Input
                  id="firstName"
                  className="col-span-3"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  *لینک
                </Label>
                <Input
                  id="lastName"
                  className="col-span-3"
                  {...register("slug", { required: true })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  *توضیحات
                </Label>
                <TooltipProvider>
                  <MinimalTiptapEditor
                    value={test}
                    onChange={setTest}
                    throttleDelay={2000}
                    className="w-full h-full col-span-3 max-h-80"
                    editorContentClassName="p-2"
                    output="html"
                    placeholder="توضیح خود را وارد نمایید"
                    autofocus={true}
                    immediatelyRender={true}
                    editable={true}
                    shouldRerenderOnTransaction
                    injectCSS={true}
                    editorClassName="focus:outline-none"
                  />
                </TooltipProvider>
              </div>
            </div>

            <SheetFooter>
              <Button type="submit">{editValue ? "ویرایش" : "ایجاد"}</Button>
            </SheetFooter>
          </form>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UploadShow;
