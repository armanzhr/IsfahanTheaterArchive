"use client";
import SkeletonLoading from "@/components/pages/people/SkeletonLoading";
import DeleteRole from "@/components/pages/roles/DeleteRole";
import UploadRole from "@/components/pages/roles/UploadRole";
import DeleteShow from "@/components/pages/shows/DeleteShow";
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

import { Roles as RolesType, Show } from "@/utils/types";
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
  const [editValue, setEditValue] = useState<Show | null>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedShow, setSelectedShow] = useState<Show>();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<Show[] | null>();
  const { getPeople, setAllPeople } = usePeopleStore();
  const handleFilterItems = () => {
    setFilteredItems(
      shows?.filter((item) => item.title.includes(searchInputValue))
    );
  };

  useEffect(() => {
    handleFilterItems();
  }, [searchInputValue]);

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
    setFilteredItems(shows);
    if (!shows) {
      fetchShows();
    }
  }, [shows]);

  useEffect(() => {
    if (!listMedias) {
      fetchMedias();
    }
  }, [listMedias]);

  const handleCreateRole = () => {
    setEditValue(null);
    setOpen(true);
  };
  const handleEditRole = (item: Show) => {
    setEditValue(item);
    setOpen(true);
  };
  const handleDeleteShow = (item: Show) => {
    setSelectedShow(item);
    setOpenDeleteModal(true);
  };
  const fetchAllPeople = async () => {
    try {
      const res = await getPeople(1, 10000);
      setAllPeople(res);
    } catch (error) {
      toast.error("خطا در دریافت عوامل");
    }
  };
  useEffect(() => {
    fetchAllPeople();
  }, []);

  return (
    <main className="flex flex-col gap-4 p-1 lg:gap-6">
      <Card>
        <CardContent className="p-1">
          <div className="flex gap-3">
            <Input
              dir="rtl"
              className="border focus-visible:ring-transparent"
              placeholder="جست و جو"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
            <Button onClick={() => handleCreateRole()}>نمایش جدید</Button>
          </div>

          <ScrollArea dir="rtl" className="h-[calc(100dvh-170px)] px-4 mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-start w-[150px]"></TableHead>
                  <TableHead className="text-start">نام اجرا</TableHead>

                  <TableHead>تنظیمات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems?.map((show) => (
                  <TableRow key={show.title}>
                    <TableCell className="">
                      <img
                        width={80}
                        height={80}
                        alt={show.title}
                        className="aspect-square rounded-md object-cover"
                        src={`${config.fileURL}/${
                          listMedias?.find(
                            (item) => item.id === show.posterImageId
                          )?.url
                        }`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{show.title}</TableCell>
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
                            onClick={() => handleEditRole(show)}
                          >
                            <PencilIcon className="w-3 h-3" />
                            <p>ویرایش</p>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteShow(show)}
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
          </ScrollArea>
        </CardContent>
      </Card>
      <UploadShow editValue={editValue} setOpen={setOpen} open={open} />
      <DeleteShow
        setOpen={setOpenDeleteModal}
        open={openDeleteModal}
        show={selectedShow!}
      />
    </main>
  );
};

export default Shows;
