import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Content } from "@tiptap/core";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

const ShowDetail = ({
  register,
  description,
  setDescription,
}: {
  register: UseFormRegister<FieldValues>;
  description: Content;
  setDescription: (data: Content) => void;
}) => {
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle className="text-lg">جزییات نمایش</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="name">نام نمایش</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                placeholder="نام نمایش را وارد نمایید"
                {...register("title")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="slug">نامک</Label>
              <Input
                id="slug"
                type="text"
                className="w-full"
                placeholder="نامک را وارد نمایید"
                {...register("slug")}
              />
            </div>
          </div>
          <div className="grid items-center gap-4">
            <Label htmlFor="description">توضیحات</Label>
            <div className="grid-cols-2">
              <TooltipProvider>
                <MinimalTiptapEditor
                  value={description}
                  onChange={setDescription}
                  throttleDelay={2000}
                  className="h-full max-w-[33rem] col-span-2 max-h-72 rounded-xl"
                  editorContentClassName="overflow-auto"
                  output="html"
                  immediatelyRender={true}
                  editable={true}
                  injectCSS={true}
                  editorClassName="focus:outline-none p-5"
                />
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShowDetail;
