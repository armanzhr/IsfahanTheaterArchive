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
var moment = require("moment-jalaali");

const ShowTime = ({
  commandValue,
  setCommandValue,
  showTimes,
  setShowTimes,
}: {
  commandValue: string;
  setCommandValue: (data: string) => void;
  showTimes: {
    venueId: number;
    startDate: string;
    endDate: string;
    showTimeStart: string;
  }[];
  setShowTimes: (
    showtime:
      | {
          venueId: number;
          startDate: string;
          endDate: string;
          showTimeStart: string;
        }[]
  ) => void;
}) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDate, setShowDate] =
    useState<onRangeDatePickerChangePayload | null>();
  const [time, setTime] = useState<string>();
  const [editMode, setEditMode] = useState(false);
  const { venues } = useVenuesStore();
  useEffect(() => {
    console.log(showDate);
  }, [showDate]);

  const handleClick = () => {
    const hour = time?.substring(0, 2);
    const min = time?.substring(2, 4);

    const model = {
      venueId: commandValue,
      startDate: showDate?.from.toISOString(),
      endDate: showDate?.to.toISOString(),
      showTimeStart: `${hour}:${min}`,
    };
    console.log(model);
    setShowTimes([...(showTimes ?? []), model] as any);
    setIsOpen(false);
  };

  return (
    <>
      <Card x-chunk="dashboard-07-chunk-1">
        <CardHeader>
          <CardTitle className="text-lg">زمان و محل اجرا</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">محل برگزاری</TableHead>
                <TableHead className="text-start">زمان اجرا</TableHead>
                <TableHead>تنظیمات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {showTimes?.map((showTime, index) => (
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
                    ساعت {showTime.showTimeStart}
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
                            setTime(showTime.showTimeStart.replace(":", ""));
                            setEditMode(true);
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
        </CardContent>
        <CardFooter className="justify-center border-t">
          <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setCommandValue("");
                  setShowDate(null);
                  setTime("");
                  setEditMode(false);
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
                  {editMode ? "ویرایش سانس" : " افزودن سانس"}
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
                          <CommandEmpty>محل اجرایی یافت نشد</CommandEmpty>
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
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    بازه اجرا
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
                          {showDate ? (
                            <span>
                              از {moment(showDate.from).format("jYYYY/jMM/jDD")}
                              تا {moment(showDate.to).format("jYYYY/jMM/jDD")}
                            </span>
                          ) : (
                            <span>بازه را انتخاب کنید</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarProvider
                          locale="fa"
                          round="x4"
                          accentColor="#6374ae"
                        >
                          <Calendar
                            defaultValue={new Date()}
                            onChange={(e) => setShowDate(e)}
                            weekends={[6]}
                            from={moment()}
                            to={moment().add(3, "days")}
                            range
                          />
                        </CalendarProvider>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    زمان اجرا
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
                  {editMode ? "ویرایش " : " افزودن "}
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
