import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { usePeopleStore } from "@/service/store/usePeopleStore";

import { Media, People } from "@/utils/types";
import { CheckIcon, PencilIcon, TrashIcon, UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/utils/cn";
import UploadPeopleForm from "./UploadPeopleForm";

const UploadPeople = ({
  open,
  setOpen,
  editValue,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  editValue?: People | null;
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-center mt-3">
            {editValue ? "ویرایش کاربر" : "ایجاد کاربر جدید"}
          </SheetTitle>
        </SheetHeader>
        <UploadPeopleForm editValue={editValue} open={open} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default UploadPeople;
