"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MultiSelect } from "@/components/ui/multi-select";
import { useRolesStore } from "@/service/store/useRolesStore";
import { People, Roles } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { Content } from "@tiptap/core";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import ShowDetail from "./ShowDetail";
import ShowTime from "./ShowTime";
var moment = require("moment-jalaali");
const UploadShow = ({
  open,
  setOpen,
  editValue,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  editValue?: Roles | null;
}) => {
  const { handleSubmit, register, watch, setValue, reset } = useForm();

  const [commandValue, setCommandValue] = useState("");
  const { people } = usePeopleStore();
  const { roles } = useRolesStore();
  const title = watch("title");
  const [description, setDescription] = useState<Content>("");
  const [showTimes, setShowsTimes] = useState<
    { venueId: number; showDate: string; showTimeStart: string }[]
  >([]);
  const [selectedPeopleByRole, setSelectedPeopleByRole] = useState({}); // State for tracking selected people per role

  // Generate slug when title changes
  useEffect(() => {
    const slug = `${title}`.trim().replace(/\s+/g, "-");
    if (!title) {
      setValue("slug", null);
    } else {
      setValue("slug", slug);
    }
  }, [title, setValue]);

  const onSubmit = async (data: any) => {
    console.log("form data", data);
    console.log("description", description);
    console.log("people", selectedPeopleByRole);
  };

  const handleChangeValue = ({
    roleId,
    people,
  }: {
    roleId: number;
    people: number[];
  }) => {
    // Update the state for the specific role
    setSelectedPeopleByRole((prev) => ({
      ...prev, // Copy previous selections
      [roleId]: people, // Update only the specific role's selected people
    }));
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>Open</DrawerTrigger>
        <DrawerContent className="h-full">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              {editValue ? "ویرایش نمایش" : "ایجاد نمایش جدید"}
            </DrawerTitle>
          </DrawerHeader>
          <main className="grid overflow-y-auto flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                id="show-form"
                className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
              >
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <ShowDetail
                    description={description}
                    setDescription={setDescription}
                    register={register}
                  />
                  <ShowTime
                    showTimes={showTimes}
                    setShowTimes={setShowsTimes}
                    commandValue={commandValue}
                    setCommandValue={setCommandValue}
                  />
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle className="text-lg">عوامل</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="flex flex-col gap-3 h-60">
                          <ScrollArea dir="rtl">
                            {roles?.map((item) => (
                              <div
                                className="flex gap-3 mb-3 items-start"
                                key={item.id}
                              >
                                <p className="text-sm font-semibold">
                                  {item.name}
                                </p>

                                <MultiSelect
                                  options={people}
                                  onValueChange={handleChangeValue}
                                  defaultValue={{
                                    roleId: item.id, // Pass the role's ID
                                    people: selectedPeopleByRole[item.id] || [], // Pass selected people specific to this role
                                  }}
                                  value={{
                                    roleId: item.id, // Pass the role's ID
                                    people: selectedPeopleByRole[item.id] || [], // Pass selected people specific to this role
                                  }}
                                  role={item}
                                  placeholder="Select frameworks"
                                  variant="default"
                                  animation={2}
                                  maxCount={10}
                                />
                              </div>
                            ))}
                          </ScrollArea>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">تصاویر نمایش</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <Image
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src="/placeholder.svg"
                          width="300"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <button>
                            <Image
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src="/placeholder.svg"
                              width="84"
                            />
                          </button>
                          <button>
                            <Image
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src="/placeholder.svg"
                              width="84"
                            />
                          </button>
                          <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </form>

              <DrawerFooter className="mb-2 p-0">
                <Button type="submit" form="show-form">
                  آپلود
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">لغو</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </main>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UploadShow;
