import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import { Venues } from "@/utils/types";
import { CalendarClock, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const VenueDateContainer = () => {
  const { getVenues, venues } = useVenuesStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVanue, setSelectedVenue] = useState<Venues | null>();
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
          {venues?.map((venue) => (
            <Badge
              className="h-8 m-1 cursor-pointer hover:scale-105 transition-all duration-300"
              key={venue.id}
              variant={venue.id === selectedVanue?.id ? "default" : "secondary"}
              onClick={() => setSelectedVenue(venue)}
            >
              {venue.name}
            </Badge>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div>bye</div>
      </TabsContent>
    </Tabs>
  );
};

export default VenueDateContainer;
