import Loading from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHomepageStore } from "@/service/store/useHomepageStore";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import { cn } from "@/utils/cn";
import { Venues } from "@/utils/types";
import { CalendarClock, CalendarIcon, MapPin, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Calendar, CalendarProvider } from "zaman";
var moment = require("moment-jalaali");

const VenueDateContainer = () => {
  const { getVenues, venues } = useVenuesStore();
  const {
    selectedVenue,
    setSelectedVenue,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showTime,
    setShowTime,
  } = useHomepageStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const fetchVenues = async () => {
    setIsLoading(true);
    try {
      await getVenues();
    } catch (error) {
      toast.error("خطا در دریافت لیست محل های اجرا");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!venues) {
      fetchVenues();
    }
  }, [venues]);

  useEffect(() => {
    if (searchParams.get("venue")) {
      setSelectedVenue(Number(searchParams.get("venue")));
    }
  }, []);
  useEffect(() => {
    if (selectedVenue) {
      params.set("venue", selectedVenue.toString());
    } else {
      params.delete("venue");
    }

    router.push(`/test/show?${params.toString()}`);
  }, [selectedVenue]);
  return (
    <Tabs defaultValue="account" dir="rtl">
      <TabsList className="grid grid-cols-2 w-2/4">
        <TabsTrigger value="account">
          <span className="ml-1">
            <MapPin className="h-4 w-4" />
          </span>
          محل اجرا
        </TabsTrigger>
        <TabsTrigger value="password">
          <span className="ml-1">
            <CalendarClock className="h-4 w-4" />
          </span>
          زمان اجرا
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <ScrollArea className="h-40 w-full overflow-hidden" dir="rtl">
          {isLoading ? (
            <div className="flex items-center justify-center flex-col gap-3">
              <Loading />
              <p>درحال دریافت اطلاعات</p>
            </div>
          ) : (
            venues?.map((venue) => (
              <Badge
                className="h-8 m-1 cursor-pointer hover:scale-105 transition-all duration-300"
                key={venue.id}
                variant={venue.id === selectedVenue ? "default" : "secondary"}
                onClick={() => setSelectedVenue(venue.id)}
              >
                {venue.name}
              </Badge>
            ))
          )}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="password">
        <div className="h-40 flex flex-col gap-3">
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
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      <span>{moment(startDate).format("jYYYY/jMM/jDD")}</span>
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
                      defaultValue={startDate ?? new Date()}
                      onChange={({ value }) => setStartDate(value)}
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
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      <span>{moment(endDate).format("jYYYY/jMM/jDD")}</span>
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
                      defaultValue={endDate ?? new Date()}
                      className="calendar"
                      onChange={({ value }) => setEndDate(value)}
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
              <InputOTP value={showTime!} onChange={setShowTime} maxLength={4}>
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
      </TabsContent>
    </Tabs>
  );
};

export default VenueDateContainer;
