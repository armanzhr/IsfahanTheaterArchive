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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import { cn } from "@/utils/cn";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { Calendar, CalendarProvider, DatePicker, TimePicker } from "zaman";

const ShowTime = ({
  commandValue,
  setCommandValue,
}: {
  commandValue: string;
  setCommandValue: (data: string) => void;
}) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const { venues } = useVenuesStore();
  const [calendarValue, setCalendarValue] = useState(new Date());
  return (
    <>
      <Card x-chunk="dashboard-07-chunk-1">
        <CardHeader>
          <CardTitle className="text-lg">زمان و محل اجرا</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            id="name"
            type="text"
            className="w-full"
            placeholder="پیوند را وارد نمایید"
          />
        </CardContent>
        <CardFooter className="justify-center border-t">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                افزودن سانس
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="items-center">
                <DialogTitle>افزودن سانس</DialogTitle>
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
                    تاریخ و اجرا
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "col-span-3 justify-center text-left font-normal",
                          !calendarValue && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {calendarValue ? (
                          format(calendarValue, "PPP")
                        ) : (
                          <span>تاریخ را انتخاب کنید</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarProvider>
                        <Calendar
                          defaultValue={calendarValue}
                          onChange={(e) => setCalendarValue(new Date(e.value))}
                        />
                      </CalendarProvider>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default ShowTime;
