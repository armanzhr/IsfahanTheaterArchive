import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon, TrashIcon, UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import SelectImageHandler from "../medias/SelectImage";
import { useForm } from "react-hook-form";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { Media, People } from "@/utils/types";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import config from "@/config";
import { cn } from "@/utils/cn";
import { useMediaStore } from "@/service/store/useMediaStore";
import { AxiosError } from "axios";

const years = Array.from(
  { length: Math.floor((1420 - 1340) / 10) + 1 },
  (v, i) => 1340 + i * 10
);

const UploadPeopleForm = ({
  open,
  setOpen,
  editValue,
}: {
  editValue?: People | null;
  open: boolean;
  setOpen: (data: boolean) => void;
}) => {
  const { handleSubmit, register, watch, setValue, reset } = useForm();
  const { isLoadingPeople, createPeople, updatePeople } = usePeopleStore();
  const [imageMode, setImageMode] = useState<"avatar" | "gallery">();
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandValue, setCommandValue] = useState<string>();

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  // Generate slug when firstName or lastName changes
  useEffect(() => {
    const slug = `${firstName ?? ""} ${lastName ?? ""}`
      .trim()
      .replace(/\s+/g, "-");
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
      toast.promise(
        async () => {
          try {
            await updatePeople(editValue.id, data);
            reset();
            setOpen(false);
          } catch (error) {
            throw error;
          }
        },
        {
          loading: "درحال ویرایش کاربر ...",
          success: "کاربر با موفقیت ویرایش شد",
          error: (error: AxiosError | any) => {
            if (error.response?.data.includes("is Exists")) {
              return "مشخصات کاربر قبلا ثبت شده";
            } else {
              return "خطا در ویرایش کاربر";
            }
          },
        }
      );
    } else {
      toast.promise(
        async () => {
          try {
            await createPeople(data);
            reset();
            setOpen(false);
          } catch (error) {
            throw error;
          }
        },
        {
          loading: "درحال ایجاد کاربر ...",
          success: "کاربر با موفقیت ایجاد شد",
          error: (error: AxiosError | any) => {
            if (error.response?.data.includes("is Exists")) {
              return "مشخصات کاربر قبلا ثبت شده";
            } else {
              return "خطا در ایجاد کاربر";
            }
          },
        }
      );
    }
    setSelectedImage(null);
  };
  const [isOpenMediaModal, setIsOpenMediaModal] = useState(false);
  const [galleryImage, setGalleryImage] = useState<{
    profile: Media | null;
    otherImages: Media[];
  }>({ profile: null, otherImages: [] });
  const [date, setDate] = useState<string>();

  const { selectedImage, listMedias, setSelectedImage } = useMediaStore();

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
    <>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startYear" className="text-right">
              دهه آغاز فعالیت
            </Label>
            <div dir="ltr" className="col-span-3 flex flex-col gap-2">
              <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="col-span-3 justify-between"
                  >
                    {commandValue
                      ? years?.find((item) => item.toString() === commandValue)
                      : "انتخاب"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="جست و جو" className="h-9" />
                    <CommandList>
                      <CommandEmpty> یافت نشد</CommandEmpty>
                      <CommandGroup>
                        {years?.map((item) => (
                          <CommandItem
                            key={item}
                            value={item.toString()}
                            onSelect={(currentValue) => {
                              setCommandValue(
                                currentValue === commandValue
                                  ? ""
                                  : currentValue
                              );
                              setCommandOpen(false);
                            }}
                          >
                            {item}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                commandValue === item.toString()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startYear" className="text-right">
              پروفایل
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Avatar className=" w-12 h-12">
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
                  variant="ghost"
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
        <div className="grid grid-cols-4">
          <div></div>
          <Button className="col-span-3" type="submit">
            {editValue ? "ویرایش" : "ایجاد"}
          </Button>
        </div>
      </form>
      <SelectImageHandler
        isOpen={isOpenMediaModal}
        setOpen={setIsOpenMediaModal}
      />
    </>
  );
};

export default UploadPeopleForm;
