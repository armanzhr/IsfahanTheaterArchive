"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVenuesStore } from "@/service/store/useVenuesStore";
import { Venues as VenuesType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Venues = () => {
  const { getVenues, venues, isGettingVenues } = useVenuesStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<VenuesType | null>();

  const fetchVenues = async () => {
    try {
      const res = await getVenues();
    } catch (error) {
      toast.error("خطا در دریافت محل های اجرا");
    }
  };
  useEffect(() => {
    if (!venues) {
      fetchVenues();
    }
  }, [venues]);

  const handleCreatePeople = () => {
    setEditValue(null);
    setOpen(true);
  };
  const handleEditPeople = (item: PeopleType) => {
    setEditValue(item);
    setOpen(true);
  };
  return (
    <div className="flex gap-3">
      <Input
        dir="rtl"
        className="border focus-visible:ring-transparent"
        placeholder="جست و جو"
      />
      <Button onClick={() => handleCreatePeople()}>محل جدید</Button>
    </div>
  );
};

export default Venues;
