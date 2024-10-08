import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/service/store/useAuthStore";
import { Users } from "@/utils/types";
import React, { useState } from "react";
import { toast } from "sonner";

const UserStatus = ({ status, user }: { status: boolean; user: Users }) => {
  const [checked, setChecked] = useState(status);
  const { disableUser, activeUser } = useAuthStore();

  const handleSetStatus = async () => {
    if (status) {
      toast.promise(
        async () => {
          await disableUser(user.id);
          setChecked(false);
        },
        {
          loading: "غیرفعال سازی کاربر...",
          success: "کاربر با موفقیت غیرفعال شد",
          error: "خطا در غیرفعال سازی کاربر",
        }
      );
    } else {
      toast.promise(
        async () => {
          await activeUser(user.id);
          setChecked(true);
        },
        {
          loading: "فعال سازی کاربر...",
          success: "کاربر با موفقیت فعال شد",
          error: "خطا در فعال سازی کاربر",
        }
      );
    }
  };
  return (
    <div className="flex items-center gap-3">
      <Label className="font-normal text-sx" htmlFor="user-status">
        <p>فعال</p>
      </Label>
      <Switch
        onCheckedChange={handleSetStatus}
        checked={checked}
        dir="ltr"
        id="user-status"
      />
    </div>
  );
};

export default UserStatus;
