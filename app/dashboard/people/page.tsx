"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useStateStore } from "@/service/store/useStateStore";

import React, { useEffect } from "react";
import { toast } from "sonner";
import People from "./people";

const Home = () => {
  const { getPeople, people, isGettingPeople } = useStateStore();
  const fetchPeople = async () => {
    try {
      const res = await getPeople();
    } catch (error) {
      toast.error("خطا در دریافت لیست عوامل");
    }
  };
  useEffect(() => {
    if (!people) {
      fetchPeople();
    }
  }, [people]);

  return (
    <Tabs defaultValue="people" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="roles">
          نقش ها
        </TabsTrigger>
        <TabsTrigger className="w-full" value="people">
          عوامل
        </TabsTrigger>
      </TabsList>
      <TabsContent value="roles">
        <div>test</div>
      </TabsContent>
      <TabsContent value="people">
        <People />
      </TabsContent>
    </Tabs>
  );
};

export default Home;
