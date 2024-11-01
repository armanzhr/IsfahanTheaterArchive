import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import { cn } from "@/utils/cn";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  CalendarIcon,
  MoreHorizontal,
  PencilIcon,
  PlusCircle,
  TrashIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { CalendarProvider, Calendar, DatePicker } from "zaman";
import { onRangeDatePickerChangePayload } from "zaman/dist/types";
import UploadVenueForm from "../venues/UploadVenueForm";
import { Venues } from "@/utils/types";
var moment = require("moment-jalaali");

const ShowTime = ({
  commandValue,
  setCommandValue,
  showTimes,
  setShowTimes,
}: {
  commandValue: Venues | null | undefined;
  setCommandValue: (data: Venues | null | undefined) => void;
  showTimes: {
    id: number;
    venueId: number;
    startDate: string;
    endDate: string;
    showTimeStart: string;
  }[];
  setShowTimes: (
    showtime:
      | {
          id: number;
          venueId: number;
          startDate: string;
          endDate: string;
          showTimeStart: string;
        }[]
  ) => void;
}) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [newOption, setNewOption] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [showDate, setShowDate] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });
  const [time, setTime] = useState<string>();
  const [editModeValue, setEditModeValue] = useState<{
    id: number;
    venueId: number;
    startDate: string;
    endDate: string;
    showTimeStart: string;
  } | null>();
  const { venues } = useVenuesStore();
  useEffect(() => {
    console.log(editModeValue);
  }, [editModeValue]);

  const handleClick = () => {
    const hour = time?.substring(0, 2);
    const min = time?.substring(2, 4);

    const model = {
      venueId: commandValue?.id,
      startDate: showDate?.startDate?.toISOString(),
      endDate: showDate?.endDate?.toISOString(),
      showTimeStart: `${hour}:${min}`,
    };
    console.log(model);
    if (editModeValue) {
      setShowTimes(
        showTimes.map((item) =>
          item.id === editModeValue.id ? { ...item, ...model } : item
        ) as any
      );
      setIsOpen(false);
    } else {
      setShowTimes([
        ...(showTimes ?? []),
        { ...model, id: showTimes ? showTimes.length + 1 : 1 },
      ] as any);
      setIsOpen(false);
    }
  };
  function formatTime(inputTime: string) {
    // اگر ورودی به شکل "HH:MM:SS" است، فقط "HH:MM" را برگردان
    if (inputTime.length === 8) {
      return inputTime.slice(0, 5);
    }
    // اگر ورودی به شکل "HH:MM" است، همان را برگردان
    return inputTime;
  }
  return (
    <>
      <Card x-chunk="dashboard-07-chunk-1">
        <CardHeader>
          <CardTitle className="text-lg">زمان و محل اجرا*</CardTitle>
        </CardHeader>
        <CardContent>
          {showTimes?.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-start">محل برگزاری</TableHead>
                  <TableHead className="text-start">زمان اجرا</TableHead>
                  <TableHead>تنظیمات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {showTimes.map((showTime, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {
                        venues?.filter(
                          (venue) => venue.id === Number(showTime.venueId)
                        )[0]?.name
                      }
                    </TableCell>
                    <TableCell>
                      از {moment(showTime.startDate).format("jYYYY/jMM/jDD")}
                      تا
                      {moment(showTime.endDate).format("jYYYY/jMM/jDD")}
                      ساعت {formatTime(showTime.showTimeStart)}
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
                            onClick={() => {
                              setTime(
                                formatTime(showTime.showTimeStart).replace(
                                  ":",
                                  ""
                                )
                              );
                              setShowDate({
                                startDate: moment(showTime.startDate),
                                endDate: moment(showTime.endDate),
                              });
                              setCommandValue(
                                venues?.filter(
                                  (item) => item.id === Number(showTime.venueId)
                                )[0]
                              );
                              setEditModeValue(showTime);
                              setIsOpen(true);
                            }}
                          >
                            <PencilIcon className="w-3 h-3" />
                            <p>ویرایش</p>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              setShowTimes(
                                showTimes.filter((item) => item !== showTime)
                              )
                            }
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
          ) : (
            <p>اجرایی وجود ندارد</p>
          )}
        </CardContent>
        <CardFooter className="justify-center border-t">
          <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setCommandValue(null);
                  setShowDate({ startDate: null, endDate: null });
                  setTime("");
                  setEditModeValue(null);
                }}
                size="sm"
                variant="ghost"
                className="gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                افزودن سانس
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="items-center">
                <DialogTitle>
                  {editModeValue ? "ویرایش سانس" : " افزودن سانس"}
                </DialogTitle>
                <DialogDescription>
                  زمان و محل برگزاری نمایش را وارد نمایید
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    محل برگزاری
                  </Label>
                  <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="col-span-3 justify-between"
                      >
                        {commandValue
                          ? venues?.find((item) => item.id === commandValue?.id)
                              ?.name
                          : "انتخاب محل برگزاری"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <div className="flex items-center gap-3">
                          <CommandInput
                            placeholder="جست و جوی محل برگزاری"
                            className="h-9"
                          />
                          <Popover open={newOption} onOpenChange={setNewOption}>
                            <PopoverTrigger asChild>
                              <Button variant="outline">
                                <PlusCircle className="w-4 h-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <UploadVenueForm
                                open={newOption}
                                setOpen={setNewOption}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <CommandList>
                          <CommandEmpty>محل اجرایی یافت نشد</CommandEmpty>
                          <CommandGroup>
                            {venues?.map((venue) => (
                              <CommandItem
                                key={venue.id}
                                value={venue.name}
                                onSelect={(currentValue) => {
                                  setCommandValue(
                                    currentValue === commandValue?.name
                                      ? null
                                      : venues.filter(
                                          (venue) => venue.name === currentValue
                                        )[0]
                                  );
                                  setCommandOpen(false);
                                }}
                              >
                                {venue?.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    commandValue === venue
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
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    تاریخ شروع
                  </Label>
                  <div
                    dir="rtl"
                    className="col-span-3 flex flex-col gap-2 datepicker"
                  >
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " justify-start text-left font-normal",
                            !showDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {showDate.startDate ? (
                            <span>
                              {moment(showDate.startDate).format(
                                "jYYYY/jMM/jDD"
                              )}
                            </span>
                          ) : (
                            <span>تاریخ شروع را انتخاب کنید</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarProvider
                          locale="fa"
                          round="x2"
                          accentColor="#000000"
                        >
                          <Calendar
                            defaultValue={
                              showDate.startDate ??
                              showDate.endDate ??
                              new Date()
                            }
                            onChange={({ value }) =>
                              setShowDate((prev) => ({
                                ...prev,
                                startDate: value,
                              }))
                            }
                            weekends={[6]}
                            className="calendar"
                          />
                        </CalendarProvider>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    تاریخ پایان
                  </Label>
                  <div
                    dir="rtl"
                    className="col-span-3 flex flex-col gap-2 datepicker"
                  >
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " justify-start text-left font-normal",
                            !showDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {showDate.endDate ? (
                            <span>
                              {moment(showDate.endDate).format("jYYYY/jMM/jDD")}
                            </span>
                          ) : (
                            <span>تاریخ پایان را انتخاب کنید</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarProvider
                          locale="fa"
                          round="x2"
                          accentColor="#000000"
                        >
                          <Calendar
                            defaultValue={
                              showDate.endDate ??
                              showDate.startDate ??
                              new Date()
                            }
                            className="calendar"
                            onChange={({ value }) =>
                              setShowDate((prev) => ({
                                ...prev,
                                endDate: value,
                              }))
                            }
                            weekends={[6]}
                          />
                        </CalendarProvider>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    ساعت اجرا
                  </Label>
                  <div dir="ltr" className="col-span-3 flex flex-col gap-2">
                    <InputOTP value={time} onChange={setTime} maxLength={4}>
                      <InputOTPGroup>
                        <InputOTPSlot className="w-8 h-8" index={0} />
                        <InputOTPSlot className="w-8 h-8" index={1} />
                      </InputOTPGroup>
                      :
                      <InputOTPGroup>
                        <InputOTPSlot className="w-8 h-8" index={2} />
                        <InputOTPSlot className="w-8 h-8" index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={!(commandValue && time?.length === 4 && showDate)}
                  onClick={handleClick}
                  type="submit"
                >
                  {editModeValue ? "ویرایش " : " افزودن "}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default ShowTime;
