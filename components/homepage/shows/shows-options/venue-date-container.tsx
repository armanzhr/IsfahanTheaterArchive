import Loading from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHomepageStore } from "@/service/store/useHomePageStore";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import { Venues } from "@/utils/types";
import { CalendarClock, MapPin, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const VenueDateContainer = () => {
  const { getVenues, venues } = useVenuesStore();
  const { selectedVenue, setSelectedVenue } = useHomepageStore();
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
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center flex-col gap-3 h-72">
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
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div>bye</div>
      </TabsContent>
    </Tabs>
  );
};

export default VenueDateContainer;
