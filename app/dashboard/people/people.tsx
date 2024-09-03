import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { items } from "./test";
import { PencilIcon, TrashIcon, UserIcon } from "lucide-react";

import UploadPeople from "@/components/pages/people/UploadPeople";
import { People as PeopleType } from "@/utils/types";
import DeletePeople from "@/components/pages/people/DeletePeople";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { ScrollArea } from "@/components/ui/scroll-area";

const People = () => {
  const { people } = usePeopleStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<PeopleType | null>();
  const handleCreatePeople = () => {
    setEditValue(null);
    setOpen(true);
  };
  const handleEditPeople = (item: PeopleType) => {
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

      <ScrollArea className="h-[calc(100dvh-200px)] px-4 mt-4">
        <div
          dir="rtl"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {people?.map((item) => (
            <>
              <div className="flex justify-between items-center hover:bg-gray-100 transition ease-in-out duration-300 p-2 rounded-md">
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
                  <Button
                    onClick={() => handleEditPeople(item)}
                    variant="outline"
                    className="h-8 w-8"
                    size="icon"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <DeletePeople people={item} />
                </div>
              </div>
            </>
          ))}
        </div>
      </ScrollArea>
      <UploadPeople editValue={editValue} setOpen={setOpen} open={open} />
    </>
  );
};

export default People;
