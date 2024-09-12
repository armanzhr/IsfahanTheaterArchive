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
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <main className="flex flex-col gap-4 p-1 lg:gap-6">
      <Card>
        <CardContent className="p-1">
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
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
