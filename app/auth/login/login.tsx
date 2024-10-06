"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/service/store/useAuthStore";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOff } from "lucide-react";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const { loginUser, authLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: any) => {
    toast.promise(
      async () => {
        try {
          const user = await loginUser(data);
          setCookie("auth_token", user.access);
          router.push("/dashboard");
          console.log(user);
        } catch (error) {
          throw error;
        }
      },
      {
        loading: "بررسی اطلاعات وارد شده ",
        success: "خوش آمدید",
        error: "اطلاعات وارد شده صحیح نمی باشد",
      }
    );
    console.log(data);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label htmlFor="username">نام کاربری</Label>
        <Input
          id="username"
          type="username"
          placeholder="نام کاربری خود را وارد نمایید"
          {...register("username", {
            required: "لطفا نام کاربری خود را وارد نمایید",
          })}
        />
        <p className="text-xs text-red-400">
          {errors?.username?.message?.toString()}
        </p>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">کلمه عبور</Label>
        </div>
        <div className="relative">
          <Input
            placeholder="کلمه عبور خود را وارد نمایید"
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "لطفا کلمه عبور را وارد نمایید",
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

        <p className="text-xs text-red-400">
          {errors?.password?.message?.toString()}
        </p>
      </div>
      <Button
        disabled={authLoading}
        variant="ringHover"
        type="submit"
        className="w-full"
      >
        ورود
      </Button>
    </form>
  );
};

export default Login;
