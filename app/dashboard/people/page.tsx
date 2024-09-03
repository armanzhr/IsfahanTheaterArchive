"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useEffect } from "react";
import { toast } from "sonner";
import People from "./people";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import Roles from "./roles";

const Home = () => {
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
        <Roles />
      </TabsContent>
      <TabsContent value="people">
        <People />
      </TabsContent>
    </Tabs>
  );
};

export default Home;
