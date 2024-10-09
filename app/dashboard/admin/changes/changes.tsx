"use client";
import UploadVenues from "@/components/pages/venues/UploadVenues";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleCheck,
  CirclePlusIcon,
  CircleX,
  ClockIcon,
  MoreHorizontal,
  PencilIcon,
  SquarePen,
  TrashIcon,
  UserRound,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeleteVenues from "@/components/pages/venues/DeleteVenues";
import { useAuthStore } from "@/service/store/useAuthStore";
import { Show, Users as UsersType } from "@/utils/types";
import { cn } from "@/utils/cn";
import { Skeleton } from "@/components/ui/skeleton";
import UploadUser from "@/components/pages/admin/users/UploadUser";
import UserStatus from "@/components/pages/admin/users/userStatus";
import { useChangesStore } from "@/service/store/useChangesStore";
import ShowChanges from "@/components/pages/admin/changes/ShowChanges";
var moment = require("moment-jalaali");

const Changes = () => {
  const { changesList, getChangesList } = useChangesStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<UsersType | null>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UsersType>();
  const [filteredItems, setFilteredItems] = useState<UsersType[] | null>();

  const fetchChangesList = async () => {
    try {
      const res = await getChangesList();
    } catch (error) {
      toast.error("خطا در دریافت کاربران");
    }
  };
  useEffect(() => {
    if (!changesList) {
      fetchChangesList();
    }
  }, [changesList]);

  const handleEditUser = (item: UsersType) => {
    setEditValue(item);
    setOpen(true);
  };
  const handleDeleteUser = (item: UsersType) => {
    setSelectedUser(item);
    setOpenDeleteModal(true);
  };
  return (
    <main className="flex flex-col gap-4 p-1 lg:gap-6">
      <Card>
        <CardContent className="p-1">
          <div className="flex gap-3 items-center">
            <p className="text-nowrap mr-3 text-lg font-semibold">
              لیست تغییرات
            </p>
          </div>

          <ScrollArea dir="rtl" className="h-[calc(100dvh-170px)] px-4 mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-start">درخواست</TableHead>
                  <TableHead className="text-start">درخواست دهنده</TableHead>
                  <TableHead className="text-start">وضعیت</TableHead>
                  <TableHead className="text-start">زمان درخواست</TableHead>
                  <TableHead className="text-start">تغییرات</TableHead>
                  <TableHead className="text-start">تعیین وضعیت</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {changesList
                  ? changesList?.map((change) => {
                      const show: Show = JSON.parse(change.changes);
                      console.log(show);
                      return (
                        <TableRow key={change.id}>
                          <TableCell>
                            <div className="font-medium flex gap-1 items-center">
                              {change.entityId ? (
                                <SquarePen className="w-4 h-4" />
                              ) : (
                                <CirclePlusIcon className="w-4 h-4" />
                              )}
                              {change.entityId ? "ویرایش" : "ایجاد"}{" "}
                              {show.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span>
                              {change.requesterUser.firstName}{" "}
                              {change.requesterUser.lastName}{" "}
                              <span dir="ltr" className="opacity-70 text-xs">
                                (@{change.requesterUser.userName})
                              </span>
                            </span>
                          </TableCell>

                          <TableCell className=" hidden sm:table-cell">
                            <Badge
                              className={cn(
                                change.status === 0
                                  ? "bg-orange-400"
                                  : change.status === 1
                                  ? "bg-green-400"
                                  : "bg-red-400"
                              )}
                              variant="default"
                            >
                              {change.status === 0 ? (
                                <span className="flex gap-1 items-center">
                                  <ClockIcon className="h-4 w-4" />
                                  درانتظار
                                </span>
                              ) : change.status === 1 ? (
                                <span className="flex gap-1 items-center">
                                  <CircleCheck className="h-4 w-4" />
                                  تایید شده
                                </span>
                              ) : (
                                <span className="flex gap-1 items-center">
                                  <CircleX className="h-4 w-4" />
                                  رد شده
                                </span>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {moment(change.createdAt).format(
                              "jYYYY/jMM/jDD - ساعت : HH:mm"
                            )}
                          </TableCell>
                          <TableCell className="text-sm">
                            <ShowChanges />
                          </TableCell>
                          <TableCell className="text-sm">
                            <div className="flex gap-1">
                              <Button
                                variant="default"
                                size="sm"
                                className="h-7"
                              >
                                <CircleCheck className="w-4 h-4 ml-1" />
                                <span className="text-xs">پذیرفتن</span>
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-7"
                              >
                                <CircleX className="w-4 h-4 ml-1" />
                                رد کردن
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : Array.from({ length: 5 }).map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <Skeleton className="h-3 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-3 w-[100px]" />
                        </TableCell>
                        <TableCell className="text-end"></TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      <UploadUser open={open} setOpen={setOpen} editValue={editValue} />
    </main>
  );
};

export default Changes;
