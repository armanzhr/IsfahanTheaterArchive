"use client";
import SkeletonLoading from "@/components/pages/people/SkeletonLoading";
import DeleteRole from "@/components/pages/roles/DeleteRole";
import UploadRole from "@/components/pages/roles/UploadRole";
import UploadShow from "@/components/pages/shows/UploadShow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import config from "@/config";
import { useMediaStore } from "@/service/store/useMediaStore";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { useRolesStore } from "@/service/store/useRolesStore";
import { useShowsStore } from "@/service/store/useShowsStore";
import { useVenuesStore } from "@/service/store/useVenuesStore";

import { Roles as RolesType } from "@/utils/types";
import {
  DramaIcon,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
  Turtle,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Shows = () => {
  const { getShows, shows } = useShowsStore();
  const { getMediasList, listMedias } = useMediaStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<RolesType | null>();

  const fetchShows = async () => {
    try {
      const res = await getShows();
    } catch (error) {
      toast.error("خطا در دریافت  لیست نمایش ها");
    }
  };
  const fetchMedias = async () => {
    try {
      const res = await getMediasList();
    } catch (error) {
      toast.error("خطا در دریافت لیست رسانه ها");
    }
  };

  useEffect(() => {
    if (!shows) {
      fetchShows();
    }
  }, [shows]);

  const handleCreateRole = () => {
    setEditValue(null);
    setOpen(true);
  };
  const handleEditRole = (item: RolesType) => {
    setEditValue(item);
    setOpen(true);
  };

  return (
    <main className="flex flex-col gap-4 p-1 lg:gap-6">
      <Card>
        <CardContent className="p-1">
          <div className="flex gap-3">
            <Input
              dir="rtl"
              className="border focus-visible:ring-transparent"
              placeholder="جست و جو"
            />
            <Button onClick={() => handleCreateRole()}>نمایش جدید</Button>
          </div>

          <ScrollArea className="h-[calc(100dvh-170px)] px-4 mt-4">
            <div
              dir="rtl"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-start"></TableHead>
                    <TableHead className="text-start">نام اجرا</TableHead>

                    <TableHead>تنظیمات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shows?.map((show) => (
                    <TableRow key={show.title}>
                      <TableCell className="">
                        <Image
                          width={200}
                          height={200}
                          alt={show.title}
                          crossOrigin="anonymous"
                          className="aspect-square w-full rounded-md object-cover"
                          src={`${config.fileURL}/${
                            listMedias?.find(
                              (item) => item.id === show.posterImageId
                            )?.url
                          }`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {show.title}
                      </TableCell>
                      <TableCell className="text-end">
                        <DropdownMenu dir="rtl">
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>تنظیمات</DropdownMenuLabel>
                            <DropdownMenuItem
                              className="gap-2"
                              onClick={() => console.log(show)}
                            >
                              <PencilIcon className="w-3 h-3" />
                              <p>ویرایش</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => console.log(show)}
                              className="gap-2"
                            >
                              <TrashIcon className="w-3 h-3" />
                              <p>حذف</p>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <UploadShow editValue={editValue} setOpen={setOpen} open={open} />
    </main>
  );
};

export default Shows;
