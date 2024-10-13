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
import {
  Changes as ChangesType,
  Show,
  Users as UsersType,
} from "@/utils/types";
import { cn } from "@/utils/cn";
import { Skeleton } from "@/components/ui/skeleton";
import { useChangesStore } from "@/service/store/useChangesStore";
import ShowChanges from "@/components/pages/admin/changes/ShowChanges";
import SetChangeStatus from "@/components/pages/admin/changes/SetChangeStatus";
var moment = require("moment-jalaali");

const Changes = () => {
  const { changesList, getChangesList } = useChangesStore();
  const { userInfo } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<UsersType | null>();
  const [selectedRequest, setSelectedRequest] = useState<ChangesType | null>();

  const fetchChangesList = async () => {
    try {
      const res = await getChangesList();
    } catch (error) {
      toast.error("خطا در دریافت لیست تغییرات");
    }
  };
  useEffect(() => {
    fetchChangesList();
  }, []);

  const handleOpenChanges = (item: ChangesType) => {
    setSelectedRequest(item);
    setOpen(true);
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
                  {userInfo?.roles.includes("Admin") && (
                    <TableHead className="text-start">تعیین وضعیت</TableHead>
                  )}
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

                          <TableCell>
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
                            {moment(change.createdAt)
                              .add(3, "hours")
                              .add(30, "minutes")
                              .format("jYYYY/jMM/jDD - ساعت : HH:mm")}
                          </TableCell>
                          <TableCell className="text-sm">
                            <Button
                              onClick={() => handleOpenChanges(change)}
                              variant="outline"
                              size="sm"
                              className="h-7"
                            >
                              <span className="text-xs">بررسی تغییرات</span>
                            </Button>
                          </TableCell>
                          {userInfo?.roles.includes("Admin") &&
                          change.status === 0 ? (
                            <TableCell className="text-sm">
                              <SetChangeStatus requestID={change.id} />
                            </TableCell>
                          ) : (
                            <span></span>
                          )}
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
      <ShowChanges
        selectedRequest={selectedRequest}
        setOpen={setOpen}
        open={open}
      />
    </main>
  );
};

export default Changes;
