import React, { useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { ToolbarButton } from "../toolbar-button";
import {
  CopyIcon,
  ExternalLinkIcon,
  LinkBreak2Icon,
} from "@radix-ui/react-icons";

interface LinkPopoverBlockProps {
  url: string;
  onClear: () => void;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LinkPopoverBlock: React.FC<LinkPopoverBlockProps> = ({
  url,
  onClear,
  onEdit,
}) => {
  const [copyTitle, setCopyTitle] = useState<string>("Copy");

  const handleCopy = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopyTitle("کپی شد!");
          setTimeout(() => setCopyTitle("کپی"), 1000);
        })
        .catch(console.error);
    },
    [url]
  );

  const handleOpenLink = useCallback(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, [url]);

  return (
    <div className="flex h-10 overflow-hidden rounded bg-background p-2 shadow-lg">
      <div className="inline-flex items-center gap-1">
        <ToolbarButton
          tooltip="ویرایش لینک"
          onClick={onEdit}
          className="w-auto px-2"
        >
          ویرایش لینک
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton tooltip="باز شدن در تب جدید" onClick={handleOpenLink}>
          <ExternalLinkIcon className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton tooltip="Clear link" onClick={onClear}>
          <LinkBreak2Icon className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton
          tooltip={copyTitle}
          onClick={handleCopy}
          tooltipOptions={{
            onPointerDownOutside: (e) => {
              if (e.target === e.currentTarget) e.preventDefault();
            },
          }}
        >
          <CopyIcon className="size-4" />
        </ToolbarButton>
      </div>
    </div>
  );
};
