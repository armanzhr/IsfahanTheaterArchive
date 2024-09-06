import * as React from "react";
import type { Editor } from "@tiptap/react";
import {
  CaretDownIcon,
  CodeIcon,
  DividerHorizontalIcon,
  PlusIcon,
  QuoteIcon,
} from "@radix-ui/react-icons";
import { LinkEditPopover } from "../link/link-edit-popover";
import { ImageEditDialog } from "../image/image-edit-dialog";
import type { FormatAction } from "../../types";
import { ToolbarSection } from "../toolbar-section";
import type { toggleVariants } from "@/components/ui/toggle";
import type { VariantProps } from "class-variance-authority";

type InsertElementAction = "codeBlock" | "blockquote" | "horizontalRule";
interface InsertElement extends FormatAction {
  value: InsertElementAction;
}

const formatActions: InsertElement[] = [
  {
    value: "horizontalRule",
    label: "جدا کننده",
    icon: <DividerHorizontalIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: () => false,
    canExecute: (editor) =>
      editor.can().chain().focus().setHorizontalRule().run(),
    shortcuts: ["mod", "alt", "-"],
  },
];

interface SectionFiveProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeActions?: InsertElementAction[];
  mainActionCount?: number;
}

export const SectionFive: React.FC<SectionFiveProps> = ({
  editor,
  activeActions = formatActions.map((action) => action.value),
  mainActionCount = 0,
  size,
  variant,
}) => {
  return (
    <>
      <LinkEditPopover editor={editor} size={size} variant={variant} />
      <ImageEditDialog editor={editor} size={size} variant={variant} />
      <ToolbarSection
        editor={editor}
        actions={formatActions}
        activeActions={activeActions}
        mainActionCount={mainActionCount}
        dropdownIcon={
          <>
            <PlusIcon className="size-5" />
            <CaretDownIcon className="size-5" />
          </>
        }
        dropdownTooltip="Insert elements"
        size={size}
        variant={variant}
      />
    </>
  );
};

SectionFive.displayName = "SectionFive";

export default SectionFive;