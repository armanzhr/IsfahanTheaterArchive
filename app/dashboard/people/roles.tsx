import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStateStore } from "@/service/store/useStateStore";
import { Roles as RolesType } from "@/utils/types";
import { DramaIcon, PencilIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";

const Roles = () => {
  const { roles } = useStateStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<RolesType | null>();
  const handleCreatePeople = () => {
    setEditValue(null);
    setOpen(true);
  };
  const handleEditPeople = (item: RolesType) => {
    setEditValue(item);
    setOpen(true);
  };
  return (
    <>
      <div className="flex gap-3">
        <Button onClick={() => handleCreatePeople()}>کاربر جدید</Button>
        <Input
          dir="rtl"
          className="border focus-visible:ring-transparent"
          placeholder="جست و جو"
        />
      </div>

      <div dir="rtl" className="grid gap-8 mt-6">
        {roles?.map((item) => (
          <>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className=" h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>
                    <DramaIcon className="opacity-50" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {item.name}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEditPeople(item)}
                  variant="outline"
                  className="h-8 w-8"
                  size="icon"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-8 w-8" size="icon">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ))}
        {/* <UploadPeople editValue={editValue} setOpen={setOpen} open={open} /> */}
      </div>
    </>
  );
};

export default Roles;
