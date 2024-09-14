import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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

import { Media, People } from "@/utils/types";
import { PencilIcon, TrashIcon, UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SelectImageHandler from "../medias/SelectImage";
import { useMediaStore } from "@/service/store/useMediaStore";
import config from "@/config";

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
  const [isOpenMediaModal, setIsOpenMediaModal] = useState(false);
  const [galleryImage, setGalleryImage] = useState<{
    profile: Media | null;
    otherImages: Media[];
  }>({ profile: null, otherImages: [] });
  const [date, setDate] = useState<string>();
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const [imageMode, setImageMode] = useState<"avatar" | "gallery">();
  const { selectedImage, listMedias } = useMediaStore();
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
    setDate(editValue?.startYaer?.toString());
    setGalleryImage(
      (prev) =>
        ({
          ...prev,
          profile: listMedias?.find(
            (item) => item.id === editValue?.avatarImageId
          ),
        } as any)
    );
  }, [editValue]);

  const onSubmit = async (model: any) => {
    const data = {
      ...model,
      startYear: Number(date),
      avatarImageId: galleryImage.profile?.id,
    };
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
  useEffect(() => {
    console.log(selectedImage);

    if (selectedImage) {
      setIsOpenMediaModal(false);
      if (imageMode === "avatar") {
        setGalleryImage((prev) => ({ ...prev, profile: selectedImage }));
      } else if (imageMode === "gallery") {
        setGalleryImage((prev) => ({
          ...prev,
          otherImages: [...prev?.otherImages, selectedImage],
        }));
      }
    }
  }, [selectedImage]);
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
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="startYear" className="text-right">
                سال شروع فعالیت
              </Label>
              <div dir="ltr" className="col-span-1 flex flex-col gap-2">
                <InputOTP value={date} onChange={setDate} maxLength={4}>
                  <InputOTPGroup>
                    <InputOTPSlot className="w-10 h-10" index={0} />
                    <InputOTPSlot className="w-10 h-10" index={1} />
                    <InputOTPSlot className="w-10 h-10" index={2} />
                    <InputOTPSlot className="w-10 h-10" index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startYear" className="text-right">
                پروفایل
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Avatar className=" w-16 h-16">
                  <AvatarImage
                    src={`${config.fileURL}/${galleryImage.profile?.url}`}
                    alt="user"
                  />
                  <AvatarFallback>
                    <UserIcon className="opacity-50" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button
                    onClick={() => {
                      setIsOpenMediaModal(true);
                      setImageMode("avatar");
                    }}
                    type="button"
                    variant="outline"
                    className="text-sm"
                  >
                    انتخاب تصویر جدید
                  </Button>
                  {galleryImage.profile && (
                    <Button
                      onClick={() =>
                        setGalleryImage((prev) => ({
                          ...prev,
                          profile: null,
                        }))
                      }
                      type="button"
                      variant="link"
                      className="text-red-400 text-sm "
                    >
                      <TrashIcon className="w-4 h-4 ml-1" />
                      <p>حذف تصویر</p>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">{editValue ? "ویرایش" : "ایجاد"}</Button>
          </SheetFooter>
        </form>
        <SelectImageHandler
          isOpen={isOpenMediaModal}
          setOpen={setIsOpenMediaModal}
        />
      </SheetContent>
    </Sheet>
  );
};

export default UploadPeople;
