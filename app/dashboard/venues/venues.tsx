"use client";
import UploadVenues from "@/components/pages/venues/UploadVenues";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useVenuesStore } from "@/service/store/useVenuesStore";
import { Venues as VenuesType } from "@/utils/types";
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
import { MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeleteVenues from "@/components/pages/venues/DeleteVenues";

const Venues = () => {
  const { getVenues, venues, isGettingVenues } = useVenuesStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<VenuesType | null>();

  const fetchVenues = async () => {
    try {
      const res = await getVenues();
    } catch (error) {
      toast.error("خطا در دریافت محل های اجرا");
    }
  };
  useEffect(() => {
    if (!venues) {
      fetchVenues();
    }
  }, [venues]);

  const handleCreateVenue = () => {
    setEditValue(null);
    setOpen(true);
  };
  const handleEditVenue = (item: VenuesType) => {
    setEditValue(item);
    setOpen(true);
  };
  return (
    <main className="flex flex-col gap-4 p-4 lg:gap-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3 ">
            <Input
              dir="rtl"
              className="border focus-visible:ring-transparent"
              placeholder="جست و جو"
            />
            <Button onClick={() => handleCreateVenue()}>محل جدید</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام</TableHead>
                <TableHead>محل</TableHead>
                <TableHead>تنظیمات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {venues?.map((venue) => (
                <TableRow key={venue.id}>
                  <TableCell className="font-medium">{venue.name}</TableCell>
                  <TableCell>{venue.address}</TableCell>
                  <TableCell>
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
                          onClick={() => handleEditVenue(venue)}
                        >
                          <PencilIcon className="w-3 h-3" />
                          <p>ویرایش</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
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
        </CardContent>
      </Card>
      <UploadVenues editValue={editValue} setOpen={setOpen} open={open} />
      <DeleteVenues venue={selectedVenue} />
    </main>
  );
};

export default Venues;
