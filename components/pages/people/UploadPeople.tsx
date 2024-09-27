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
import { CheckIcon, PencilIcon, TrashIcon, UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/utils/cn";
import UploadPeopleForm from "./UploadPeopleForm";
import { useMediaStore } from "@/service/store/useMediaStore";
import { toast } from "sonner";

const UploadPeople = ({
  open,
  setOpen,
  editValue,
  resetGetPeople,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  editValue?: People | null;
  resetGetPeople: () => Promise<void>;
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
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandValue, setCommandValue] = useState<string>();
  const { selectedImage, listMedias, setSelectedImage } = useMediaStore();

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
    setCommandValue(editValue?.startYear?.toString());
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
      startYear: Number(commandValue),
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
    setSelectedImage(null);
  };
  useEffect(() => {
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
        <UploadPeopleForm
          resetGetPeople={resetGetPeople}
          editValue={editValue}
          open={open}
          setOpen={setOpen}
        />
      </SheetContent>
    </Sheet>
  );
};

export default UploadPeople;
