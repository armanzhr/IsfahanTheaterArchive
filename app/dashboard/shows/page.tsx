"use client";
import SkeletonLoading from "@/components/pages/people/SkeletonLoading";
import DeleteRole from "@/components/pages/roles/DeleteRole";
import UploadRole from "@/components/pages/roles/UploadRole";
import UploadShow from "@/components/pages/shows/UploadShow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { useRolesStore } from "@/service/store/useRolesStore";
import { useVenuesStore } from "@/service/store/useVenuesStore";

import { Roles as RolesType } from "@/utils/types";
import { DramaIcon, PencilIcon, TrashIcon, Turtle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Shows = () => {
  const { getPeople, people } = usePeopleStore();
  const { getRoles, roles } = useRolesStore();
  const { getVenues, venues } = useVenuesStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<RolesType | null>();

  const fetchPeoples = async () => {
    try {
      const res = await getPeople();
    } catch (error) {
      toast.error("خطا در دریافت لیست عوامل");
    }
  };
  const fetchRoles = async () => {
    try {
      const res = await getRoles();
    } catch (error) {
      toast.error("خطا در دریافت لیست نقش ها");
    }
  };
  const fetchVenues = async () => {
    try {
      const res = await getVenues();
    } catch (error) {
      toast.error("خطا در دریافت لیست محل های اجرا");
    }
  };
  useEffect(() => {
    if (!people) {
      fetchPeoples();
    }
    if (!roles) {
      fetchRoles();
    }
    if (!venues) {
      fetchVenues();
    }
  }, [people, roles, venues]);

  const handleCreateRole = () => {
    setEditValue(null);
    setOpen(true);
  };
  const handleEditRole = (item: RolesType) => {
    setEditValue(item);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex gap-3">
        <Input
          dir="rtl"
          className="border focus-visible:ring-transparent"
          placeholder="جست و جو"
        />
        <Button onClick={() => handleCreateRole()}>نمایش جدید</Button>
      </div>

      <ScrollArea className="h-[calc(100dvh-200px)] px-4 mt-4">
        <div
          dir="rtl"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
        ></div>
      </ScrollArea>
      <UploadShow editValue={editValue} setOpen={setOpen} open={open} />
    </div>
  );
};

export default Shows;
