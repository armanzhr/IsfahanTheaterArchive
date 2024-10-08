import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import config from "@/config";
import { useAuthStore } from "@/service/store/useAuthStore";
import { deleteCookie } from "cookies-next";

import { CreditCard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserProfile() {
  const { userInfo } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("auth_token");
    router.push("/auth/login");
  };
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild className="w-[2.25rem] h-[2.25rem]">
        <Avatar>
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>حساب من</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <User className="ml-2 h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-semibold">
                {userInfo?.firstName} {userInfo?.lastName}
              </span>
              <span className="text-xs">@{userInfo?.userName}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem className="cursor-pointer" onSelect={handleLogout}>
          <LogOut className="ml-2 h-4 w-4" />
          <span>خروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
