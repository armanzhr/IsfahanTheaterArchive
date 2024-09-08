"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaStore } from "@/service/store/useMediaStore";
import React, { useEffect } from "react";

const MediaPage = () => {
  const { getMediasList } = useMediaStore();
  const handleGetMediasList = async () => {
    await getMediasList();
  };
  useEffect(() => {
    handleGetMediasList();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        className="flex flex-col items-end h-[calc(100vh-100px)]"
        defaultValue="images"
      >
        <TabsList>
          <TabsTrigger value="images">تصاویر</TabsTrigger>
          <TabsTrigger value="upload">آپلود تصویر</TabsTrigger>
        </TabsList>
        <TabsContent
          value="images"
          className="bg-red-300 w-full "
        ></TabsContent>
        <TabsContent className="h-full w-full bg-blue-200" value="upload">
          <Card className="h-full">
            <CardContent className="flex items-center justify-center">
              <UploadImage />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaPage;
