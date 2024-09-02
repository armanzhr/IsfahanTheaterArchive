import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { items } from "./test";
import { PencilIcon, TrashIcon, UserIcon } from "lucide-react";
import { useStateStore } from "@/service/store/useStateStore";

const People = () => {
  const { people } = useStateStore();

  return (
    <>
      <div className="flex gap-3">
        <Button>کاربر جدید</Button>
        <Input
          dir="rtl"
          className="border focus-visible:ring-transparent"
          placeholder="جست و جو"
        />
      </div>

      <div dir="rtl" className="grid gap-8 mt-6">
        {people?.map((item) => (
          <>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className=" h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>
                    <UserIcon className="opacity-50" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {item.firstName} {item.lastName}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-8 w-8" size="icon">
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-8 w-8" size="icon">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default People;
