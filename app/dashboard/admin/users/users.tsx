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
import { MoreHorizontal, PencilIcon, TrashIcon, UserRound } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeleteVenues from "@/components/pages/venues/DeleteVenues";
import { useAuthStore } from "@/service/store/useAuthStore";
import { Users as UsersType } from "@/utils/types";
import { cn } from "@/utils/cn";
import { Skeleton } from "@/components/ui/skeleton";
import UploadUser from "@/components/pages/admin/users/UploadUser";
import UserStatus from "@/components/pages/admin/users/userStatus";

const Users = () => {
  const { getUsers, users, isGettingUsers, userInfo } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<UsersType | null>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UsersType>();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<UsersType[] | null>();

  const handleFilterItems = () => {
    setFilteredItems(
      users?.filter((item) => item.userName.includes(searchInputValue))
    );
  };

  useEffect(() => {
    handleFilterItems();
  }, [searchInputValue]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
    } catch (error) {
      toast.error("خطا در دریافت کاربران");
    }
  };
  useEffect(() => {
    setFilteredItems(users);
    if (!users) {
      fetchUsers();
    }
  }, [users]);

  const handleCreateUser = () => {
    setEditValue(null);
    setOpen(true);
  };
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
              لیست کاربران
            </p>
            <Input
              dir="rtl"
              className="border focus-visible:ring-transparent"
              placeholder="جست و جو بر اساس نام کاربری"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
            <Button onClick={() => handleCreateUser()}>کاربر جدید</Button>
          </div>

          <ScrollArea dir="rtl" className="h-[calc(100dvh-170px)] px-4 mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-start">نام کاربری</TableHead>
                  <TableHead className="text-start">نام</TableHead>
                  <TableHead className="text-start">نام خانوادگی</TableHead>
                  <TableHead className="text-start hidden sm:table-cell">
                    نقش کاربری
                  </TableHead>
                  <TableHead className="text-start">وضعیت</TableHead>

                  <TableHead>تنظیمات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems
                  ? filteredItems?.map((user) => (
                      <TableRow
                        key={user.id}
                        className={cn(!user.isActive && "opacity-50")}
                      >
                        <TableCell className="font-medium">
                          {user.userName}{" "}
                          {user.id === userInfo?.id && <span>(شما)</span>}
                        </TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>
                          {user.roles.map((item) =>
                            item === "Admin"
                              ? "ادمین"
                              : item === "Support"
                              ? "پشتیبان"
                              : "کاربر"
                          )}
                        </TableCell>
                        <TableCell className=" hidden sm:table-cell">
                          <Badge
                            variant={user.isActive ? "secondary" : "outline"}
                          >
                            {user.isActive ? "فعال" : "غیرفعال"}
                          </Badge>
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
                                onClick={() => handleEditUser(user)}
                              >
                                <PencilIcon className="w-3 h-3" />
                                <p>ویرایش</p>
                              </DropdownMenuItem>
                              {userInfo?.id !== user.id && (
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="gap-2"
                                >
                                  <UserRound className="w-3 h-3" />
                                  <UserStatus
                                    user={user}
                                    status={user.isActive}
                                  />
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
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

export default Users;
