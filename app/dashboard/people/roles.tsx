import SkeletonLoading from "@/components/pages/people/SkeletonLoading";
import DeleteRole from "@/components/pages/roles/DeleteRole";
import UploadRole from "@/components/pages/roles/UploadRole";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRolesStore } from "@/service/store/useRolesStore";

import { Roles as RolesType } from "@/utils/types";
import { DramaIcon, PencilIcon, TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Roles = () => {
  const { getRoles, roles, isGettingRoles } = useRolesStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<RolesType | null>();

  const fetchRoles = async () => {
    try {
      const res = await getRoles();
    } catch (error) {
      toast.error("خطا در دریافت لیست عوامل");
    }
  };
  useEffect(() => {
    if (!roles) {
      fetchRoles();
    }
  }, [roles]);

  const handleCreateRole = () => {
    setEditValue(null);
    setOpen(true);
  };
  const handleEditRole = (item: RolesType) => {
    setEditValue(item);
    setOpen(true);
  };
  return (
    <>
      <div className="flex gap-3">
        <Button onClick={() => handleCreateRole()}>نقش جدید</Button>
        <Input
          dir="rtl"
          className="border focus-visible:ring-transparent"
          placeholder="جست و جو"
        />
      </div>

      <ScrollArea className="h-[calc(100dvh-200px)] px-4 mt-4">
        <div
          dir="rtl"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
        >
          {isGettingRoles ? (
            <SkeletonLoading count={6} />
          ) : (
            roles?.map((item) => (
              <>
                <div className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition ease-in-out duration-300 p-2 rounded-md">
                  <div className="flex items-center gap-3">
                    <Avatar className=" h-12 w-12 sm:flex">
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
                      onClick={() => handleEditRole(item)}
                      variant="outline"
                      className="h-8 w-8"
                      size="icon"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <DeleteRole role={item} />
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </ScrollArea>
      <UploadRole editValue={editValue} setOpen={setOpen} open={open} />
    </>
  );
};

export default Roles;
