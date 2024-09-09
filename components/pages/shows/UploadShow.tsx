"use client";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";

import { TooltipProvider } from "@/components/ui/tooltip";

import { useRolesStore } from "@/service/store/useRolesStore";

import { People, Roles } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  CalendarIcon,
  Cat,
  CheckIcon,
  ChevronLeft,
  Dog,
  Fish,
  PlusCircle,
  Rabbit,
  Turtle,
  Upload,
} from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Content } from "@tiptap/core";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import { cn } from "@/utils/cn";
import { Calendar } from "@/components/ui/calendar";
import { TimePickerDemo } from "@/components/ui/time-picker-demo";

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
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandValue, setCommandValue] = useState("");
  const [date, setDate] = useState<Date>();
  const { people } = usePeopleStore();
  const { createRole, updateRole, roles } = useRolesStore();
  const { venues } = useVenuesStore();
  const title = watch("title");
  const [test, setTest] = useState<Content>("");
  const [selectedPeopleByRole, setSelectedPeopleByRole] = React.useState({}); // State for tracking selected people per role

  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      setDate(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
  };

  // Generate slug when title changes
  useEffect(() => {
    const slug = `${title}`.trim().replace(/\s+/g, "-");
    if (!title) {
      setValue("slug", null);
    } else {
      setValue("slug", slug);
    }
  }, [title, setValue]);

  useEffect(() => {
    setValue("name", editValue?.name);
  }, [editValue]);

  const onSubmit = async (data: any) => {
    if (editValue) {
      try {
        await updateRole(editValue.id, data);
        toast.success("نقش با موفقیت ویرایش شد");
        reset();
        setOpen(false);
      } catch (error) {
        toast.error("خطا در ویرایش نقش");
      }
    } else {
      try {
        await createRole(data);
        toast.success("نقش با موفقیت اضافه شد");
        reset();
        setOpen(false);
      } catch (error) {
        toast.error("خطا در ایجاد نقش");
      }
    }
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
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle className="text-lg">جزییات نمایش</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="grid gap-3 col-span-2">
                            <Label htmlFor="name">نام نمایش</Label>
                            <Input
                              id="name"
                              type="text"
                              className="w-full"
                              placeholder="نام نمایش را وارد نمایید"
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="name">پیوند</Label>
                            <Input
                              id="name"
                              type="text"
                              className="w-full"
                              placeholder="پیوند را وارد نمایید"
                            />
                          </div>
                        </div>
                        <div className="grid items-center gap-4">
                          <Label htmlFor="description">توضیحات</Label>
                          <div className="grid-cols-2">
                            <TooltipProvider>
                              <MinimalTiptapEditor
                                value={test}
                                onChange={setTest}
                                throttleDelay={2000}
                                className="h-full max-w-[33rem] col-span-2 max-h-72 rounded-xl"
                                editorContentClassName="overflow-auto"
                                output="html"
                                immediatelyRender={true}
                                editable={true}
                                injectCSS={true}
                                editorClassName="focus:outline-none p-5"
                              />
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-1">
                    <CardHeader>
                      <CardTitle className="text-lg">زمان و محل اجرا</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                          >
                            {commandValue
                              ? venues?.find(
                                  (item) => item.id.toString() === commandValue
                                )?.name
                              : "انتخاب محل برگزاری"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="جست و جوی محل برگزاری"
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {venues?.map((venue) => (
                                  <CommandItem
                                    key={venue.id}
                                    value={venue.id.toString()}
                                    onSelect={(currentValue) => {
                                      setCommandValue(
                                        currentValue === commandValue
                                          ? ""
                                          : currentValue
                                      );
                                      setCommandOpen(false);
                                    }}
                                  >
                                    {venue?.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        commandValue === venue.id.toString()
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(d) => handleSelect(d)}
                            initialFocus
                          />
                          <div className="p-3 border-t border-border">
                            <TimePickerDemo setDate={setDate} date={date} />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </CardContent>
                    <CardFooter className="justify-center border-t">
                      <Button size="sm" variant="ghost" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        افزودن
                      </Button>
                    </CardFooter>
                  </Card>
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
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Save Product</Button>
              </div>
            </div>
          </main>
          <DrawerFooter>
            <Button>آپلود</Button>
            <DrawerClose asChild>
              <Button variant="outline">لغو</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UploadShow;
