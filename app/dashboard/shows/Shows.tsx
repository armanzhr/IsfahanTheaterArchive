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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import config from "@/config";
import { useAuthStore } from "@/service/store/useAuthStore";
import { useMediaStore } from "@/service/store/useMediaStore";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { useRolesStore } from "@/service/store/useRolesStore";
import { useShowsStore } from "@/service/store/useShowsStore";

import { Roles as RolesType, Show, ShowInclusive } from "@/utils/types";
import {
  ClipboardIcon,
  DramaIcon,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
  Turtle,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";

const Shows = () => {
  const { getShowsList, showsList, createShows, resetShowInfo, copyShow } =
    useShowsStore();
  const { userInfo } = useAuthStore();
  const { getMediasList, listMedias } = useMediaStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<ShowInclusive | null>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedShow, setSelectedShow] = useState<ShowInclusive>();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<ShowInclusive[] | null>(
    []
  );
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const { getPeople, setAllPeople } = usePeopleStore();
  const [hasMore, setHasMore] = useState(true);

  const fetchShows = async () => {
    try {
      const params: { page: number; search?: string } = {
        page: page,
      };

      if (query.length > 2) {
        params.search = query;
      }
      const response = await getShowsList(page, 10, params.search);

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setFilteredItems((prev) => [...(prev ?? []), ...response.data]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      toast.error("خطا در دریافت لیست نمایش ها");
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
    // بارگذاری کاربران زمانی که query تغییر کند (برای جستجو)
    if (filteredItems?.length === 0) {
      fetchShows();
    }
  }, [query, filteredItems]);

  useEffect(() => {
    if (!listMedias) {
      fetchMedias();
    }
  }, [listMedias]);

  const handleCreateRole = () => {
    setEditValue(null);
    resetShowInfo();
    setOpen(true);
  };
  const handleEditRole = (item: ShowInclusive) => {
    setEditValue(item);
    setOpen(true);
  };
  const handleDeleteShow = (item: ShowInclusive) => {
    setSelectedShow(item);
    setOpenDeleteModal(true);
  };

  const handleDuplicateShow = async (item: ShowInclusive) => {
    console.log(item);

    toast.promise(
      async () => {
        try {
          const data = await copyShow(item.id);
          setEditValue(data);
          setOpen(true);
        } catch (error) {
          throw error;
        }
      },
      {
        loading: "در حال کپی نمایش ...",
        success: "نمایش با موفقیت کپی شد",
        error: "خطا در کپی نمایش",
      }
    );
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
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
            <Button onClick={() => handleCreateRole()}>نمایش جدید</Button>
          </div>

          <div
            id="scrollableDiv"
            dir="rtl"
            className="overflow-auto h-[calc(100dvh-170px)] px-4 mt-4"
          >
            <InfiniteScroll
              dataLength={filteredItems?.length!}
              next={fetchShows}
              hasMore={hasMore}
              loader={<p className="overflow-hidden">درحال بارگذاری...</p>}
              scrollableTarget="scrollableDiv"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-start w-[150px]"></TableHead>
                    <TableHead className="text-start">نام اجرا</TableHead>

                    <TableHead>تنظیمات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems
                    ? filteredItems?.map((show) => (
                        <TableRow key={show.title}>
                          <TableCell className="">
                            <img
                              loading="lazy"
                              width={80}
                              height={80}
                              alt={show.title}
                              className="aspect-square rounded-md object-cover"
                              src={`${config.fileURL}/${show.posterImageUrl}`}
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
                                  onClick={() => handleEditRole(show)}
                                >
                                  <PencilIcon className="w-3 h-3" />
                                  <p>ویرایش</p>
                                </DropdownMenuItem>
                                {userInfo?.roles.includes("Admin") && (
                                  <DropdownMenuItem
                                    className="gap-2"
                                    onClick={() => handleDuplicateShow(show)}
                                  >
                                    <ClipboardIcon className="w-3 h-3" />
                                    <p>کپی</p>
                                  </DropdownMenuItem>
                                )}
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
                      ))
                    : Array.from({ length: 5 }).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="">
                            <Skeleton className={`h-[80px] w-[80px]`} />
                          </TableCell>
                          <TableCell className="font-medium">
                            <Skeleton className="h-4 w-[100px]" />
                          </TableCell>
                          <TableCell className="text-end"></TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </InfiniteScroll>
          </div>
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
