import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckIcon,
  XCircle,
  ChevronDown,
  XIcon,
  WandSparkles,
  PlusCircle,
  UserIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { People, Roles } from "@/utils/types";
import config from "@/config";
import { useMediaStore } from "@/service/store/useMediaStore";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  "mx-1 mb-2 p-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps extends VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: People[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: { roleId: number; people: number[] }) => void;

  /** The default selected values when the component mounts. */
  defaultValue: { roleId: number; people: number[] };

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
  role: Roles;
  value?: any;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = { roleId: 0, people: [] },
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      role,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<{
      roleId: number;
      people: number[];
    }>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const { listMedias } = useMediaStore();
    React.useEffect(() => {
      setSelectedValues(defaultValue);
    }, [defaultValue]);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues.people];
        newSelectedValues.pop();
        setSelectedValues({ roleId: role.id, people: newSelectedValues });
        onValueChange({ roleId: role.id, people: newSelectedValues });
      }
    };

    const toggleOption = (value: number) => {
      const newSelectedValues = selectedValues.people.includes(value)
        ? selectedValues.people.filter((v) => v !== value)
        : [...selectedValues.people, value];

      setSelectedValues({ roleId: role.id, people: newSelectedValues });
      onValueChange({ roleId: role.id, people: newSelectedValues });
    };

    const handleClear = () => {
      setSelectedValues({ roleId: role.id, people: [] });
      onValueChange({ roleId: role.id, people: [] });
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.people.slice(0, maxCount);
      setSelectedValues({ roleId: role.id, people: newSelectedValues });
      onValueChange({ roleId: role.id, people: newSelectedValues });
    };

    const toggleAll = () => {
      if (selectedValues.people.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.id);
        setSelectedValues({ roleId: role.id, people: allValues });
        onValueChange({ roleId: role.id, people: allValues });
      }
    };

    return (
      <div className="flex items-start">
        <Popover
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          modal={modalPopover}
        >
          <PopoverTrigger asChild>
            <Button
              className="w-6 h-6"
              variant={"secondary"}
              ref={ref}
              {...props}
              onClick={handleTogglePopover}
              size="icon"
            >
              <PlusCircle className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
            onEscapeKeyDown={() => setIsPopoverOpen(false)}
          >
            <Command>
              <CommandInput
                placeholder="جست و جو"
                onKeyDown={handleInputKeyDown}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.people.includes(
                      option.id
                    );
                    return (
                      <CommandItem
                        key={option.id}
                        onSelect={() => toggleOption(option.id)}
                        className="cursor-pointer"
                        value={`${option.lastName}`}
                      >
                        <div
                          className={cn(
                            "ml-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>

                        <Avatar className=" h-6 w-6 ml-2 sm:flex">
                          <AvatarImage
                            src={`${config.fileURL}/${
                              listMedias?.find(
                                (item) => item.id === option.avatarImageId
                              )?.url
                            }`}
                            alt="Avatar"
                          />
                          <AvatarFallback>
                            <UserIcon className="opacity-50 h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>

                        <span>{`${option.firstName} ${option.lastName}`}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center justify-between">
                    {selectedValues.people.length > 0 && (
                      <>
                        <CommandItem
                          onSelect={handleClear}
                          className="flex-1 justify-center cursor-pointer"
                        >
                          پاک کردن
                        </CommandItem>
                        <Separator
                          orientation="vertical"
                          className="flex min-h-6 h-full"
                        />
                      </>
                    )}
                    <CommandItem
                      onSelect={() => setIsPopoverOpen(false)}
                      className="flex-1 justify-center cursor-pointer max-w-full"
                    >
                      بستن
                    </CommandItem>
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-wrap items-center">
            {selectedValues.people.slice(0, maxCount).map((value) => {
              const option = options.find((o) => o.id === value);

              return (
                <Badge
                  key={value}
                  className={cn(
                    isAnimating ? "animate-bounce" : "",
                    multiSelectVariants({ variant })
                  )}
                  style={{ animationDuration: `${animation}s` }}
                >
                  <div className="flex w-full items-center gap-2">
                    <Avatar className=" h-7 w-7 sm:flex">
                      <AvatarImage
                        src={`${config.fileURL}/${
                          listMedias?.find(
                            (item) => item.id === option?.avatarImageId
                          )?.url
                        }`}
                        alt="Avatar"
                      />
                      <AvatarFallback>
                        <UserIcon className="opacity-50 h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    {`${option?.firstName} ${option?.lastName}`}
                    <XCircle
                      className=" h-4 w-4 mx-1 cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleOption(value);
                      }}
                    />
                  </div>
                </Badge>
              );
            })}
            {selectedValues.people.length > maxCount && (
              <Badge
                className={cn(
                  "bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
                  isAnimating ? "animate-bounce" : "",
                  multiSelectVariants({ variant })
                )}
                style={{ animationDuration: `${animation}s` }}
              >
                {`+ ${selectedValues.people.length - maxCount} more`}
                <XCircle
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    clearExtraOptions();
                  }}
                />
              </Badge>
            )}
          </div>
        </div>
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
