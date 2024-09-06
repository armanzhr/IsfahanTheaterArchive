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
import { TooltipProvider } from "@/components/ui/tooltip";

import { useRolesStore } from "@/service/store/useRolesStore";

import { People, Roles } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Cat,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

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

  const { people } = usePeopleStore();
  const { createRole, updateRole, roles } = useRolesStore();
  const [selectedFrameworks, setSelectedFrameworks] = useState<{
    roleId: number;
    people: number[];
  }>({
    roleId: 0,
    people: [],
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(true);

  const title = watch("title");
  const [test, setTest] = useState<string>("");
  useEffect(() => {
    console.log(test);
  }, [test]);

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

  const handleTogglePopover = (item) => {
    setIsPopoverOpen((prev) => !prev);
    console.log(item);
  };
  useEffect(() => {
    console.log(isPopoverOpen);
  }, [isPopoverOpen]);

  const [selectedPeopleByRole, setSelectedPeopleByRole] = React.useState({}); // State for tracking selected people per role

  const handleChangeValue = ({ roleId, people }) => {
    // Update the state for the specific role
    setSelectedPeopleByRole((prev) => ({
      ...prev, // Copy previous selections
      [roleId]: people, // Update only the specific role's selected people
    }));
  };
  useEffect(() => {
    console.log(selectedPeopleByRole);
  }, [selectedPeopleByRole]);

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
          {/* <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  *عنوان نمایش
                </Label>
                <Input
                  id="firstName"
                  className="col-span-3"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  *لینک
                </Label>
                <Input
                  id="lastName"
                  className="col-span-3"
                  {...register("slug", { required: true })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  *توضیحات
                </Label>
                
              </div>
            </div>
            <div className="flex gap-4 py-4">
              <Label htmlFor="name" className="text-right">
                *عوامل
              </Label>
              <div className="flex flex-col gap-3 max-h-96">
                <ScrollArea dir="rtl">
                  {roles?.map((item) => (
                    <div className="flex gap-3 items-start" key={item.id}>
                      <p className="text-sm font-semibold">{item.name}</p>

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
            <SheetFooter>
               <Button type="submit">{editValue ? "ویرایش" : "ایجاد"}</Button> 
            </SheetFooter>
          </form> */}
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
                      <CardTitle>Stock</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">SKU</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="w-[100px]">Size</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-semibold">
                              GGPC-001
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-1" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-1"
                                type="number"
                                defaultValue="100"
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="price-1" className="sr-only">
                                Price
                              </Label>
                              <Input
                                id="price-1"
                                type="number"
                                defaultValue="99.99"
                              />
                            </TableCell>
                            <TableCell>
                              <ToggleGroup
                                type="single"
                                defaultValue="s"
                                variant="outline"
                              >
                                <ToggleGroupItem value="s">S</ToggleGroupItem>
                                <ToggleGroupItem value="m">M</ToggleGroupItem>
                                <ToggleGroupItem value="l">L</ToggleGroupItem>
                              </ToggleGroup>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">
                              GGPC-002
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-2" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-2"
                                type="number"
                                defaultValue="143"
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="price-2" className="sr-only">
                                Price
                              </Label>
                              <Input
                                id="price-2"
                                type="number"
                                defaultValue="99.99"
                              />
                            </TableCell>
                            <TableCell>
                              <ToggleGroup
                                type="single"
                                defaultValue="m"
                                variant="outline"
                              >
                                <ToggleGroupItem value="s">S</ToggleGroupItem>
                                <ToggleGroupItem value="m">M</ToggleGroupItem>
                                <ToggleGroupItem value="l">L</ToggleGroupItem>
                              </ToggleGroup>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">
                              GGPC-003
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-3" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-3"
                                type="number"
                                defaultValue="32"
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="price-3" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="price-3"
                                type="number"
                                defaultValue="99.99"
                              />
                            </TableCell>
                            <TableCell>
                              <ToggleGroup
                                type="single"
                                defaultValue="s"
                                variant="outline"
                              >
                                <ToggleGroupItem value="s">S</ToggleGroupItem>
                                <ToggleGroupItem value="m">M</ToggleGroupItem>
                                <ToggleGroupItem value="l">L</ToggleGroupItem>
                              </ToggleGroup>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="justify-center border-t">
                      <Button size="sm" variant="ghost" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        Add Variant
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle>Product Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="status">Status</Label>
                          <Select>
                            <SelectTrigger
                              id="status"
                              aria-label="Select status"
                            >
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Active</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle>Product Images</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                      </CardDescription>
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
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UploadShow;
