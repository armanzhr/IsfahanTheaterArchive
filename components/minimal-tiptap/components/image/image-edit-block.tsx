import type { Editor } from "@tiptap/react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import SelectImageHandler from "@/components/pages/medias/SelectImage";
import { useMediaStore } from "@/service/store/useMediaStore";
import Image from "next/image";
import config from "@/config";

interface ImageEditBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  editor: Editor;
  close: () => void;
}

const ImageEditBlock = ({
  editor,
  className,
  close,
  ...props
}: ImageEditBlockProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [link, setLink] = useState<string>("");
  const [isOpenMediaModal, setIsOpenMediaModal] = useState(false);
  const { selectedImage, setSelectedImage } = useMediaStore();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor
      .chain()
      .focus()
      .setImage({ src: `${config.fileURL}/${selectedImage?.url}` })
      .run();
    setSelectedImage(null);
    close();
  };

  useEffect(() => {
    if (selectedImage) {
      setIsOpenMediaModal(false);
    }
  }, [selectedImage]);

  return (
    <>
      <div className={cn("space-y-6", className)} {...props}>
        <div className="space-y-1">
          <div className="flex flex-col gap-3">
            {selectedImage && (
              <img
                alt="image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src={`${config.fileURL}/${selectedImage?.url}`}
                width="84"
              />
            )}
            <Button
              onClick={() => {
                setIsOpenMediaModal(true);
              }}
              type="button"
              variant="outline"
              className="inline-block"
            >
              انتخاب تصویر
            </Button>
          </div>
        </div>
        <Button type="button" className="w-full" onClick={handleClick}>
          افزودن
        </Button>
      </div>
      <SelectImageHandler
        isOpen={isOpenMediaModal}
        setOpen={setIsOpenMediaModal}
      />
    </>
  );
};

export { ImageEditBlock };
