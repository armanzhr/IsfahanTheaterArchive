import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/service/store/useAuthStore";
import { cn } from "@/utils/cn";
import { Users, Venues } from "@/utils/types";
import { EyeIcon, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UploadUser = ({
  open,
  setOpen,
  editValue,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  editValue?: Users | null;
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState(true);
  const { createUser } = useAuthStore();

  useEffect(() => {
    reset();
    setValue("firstName", editValue?.firstName);
    setValue("lastName", editValue?.lastName);
  }, [editValue]);

  const onSubmit = async (data: any) => {
    if (editValue) {
      toast.promise(
        async () => {
          try {
            reset();
            setOpen(false);
          } catch (error) {
            throw error;
          }
        },
        {
          loading: "در حال ویرایش محل اجرا...",
          success: "محل اجرا با موفقیت ویرایش شد",
          error: "خطا در ویرایش محل اجرا",
        }
      );
    } else {
      toast.promise(
        async () => {
          try {
            const model = { ...data, roles: ["Support"] };
            console.log(model);
            await createUser(model);
            reset();
            setOpen(false);
          } catch (error) {
            throw error;
          }
        },
        {
          loading: "در حال ایجاد کاربر ...",
          success: "کاربر  با موفقیت ایجاد شد",
          error: "خطا در ایجاد کاربر ",
        }
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-center mt-3">
            {editValue ? "ویرایش کاربر" : "ایجاد کاربر جدید"}
          </SheetTitle>
        </SheetHeader>
        <form id="venue-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                نام*
              </Label>
              <Input
                id="firstName"
                className="col-span-3"
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                نام خانوادگی*
              </Label>
              <Input
                id="firstName"
                className="col-span-3"
                {...register("lastName", { required: true })}
              />
            </div>
            <Separator />
            {!editValue && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  نام کاربری*
                </Label>
                <Input
                  id="firstName"
                  className="col-span-3"
                  {...register("username", { required: true })}
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {editValue ? "کلمه عبور جدید" : "کلمه عبور*"}
              </Label>
              <div className="relative col-span-3">
                <Input
                  autoComplete="new-password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register(editValue ? "newPassword" : "password", {
                    required: !editValue,
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                      message: "invalid email address",
                    },
                  })}
                />

                <div className="absolute bottom-0 left-0 h-full flex items-center">
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className=" ml-3 w-7 h-7"
                    variant="link"
                    size="icon"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              <p
                className={cn(
                  "text-xs col-span-4",
                  errors?.password?.message && "text-red-400"
                )}
              >
                کلمه عبور می بایست حداقل 8 کاراکتر از حروف انگلیسی بزرگ و کوچک،
                اعداد و نشانه ها باشد
              </p>
            </div>
          </div>
        </form>
        <div className="grid grid-cols-4">
          <div></div>
          <Button form="venue-form" className="col-span-3" type="submit">
            {editValue ? "ویرایش" : "ایجاد"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UploadUser;
