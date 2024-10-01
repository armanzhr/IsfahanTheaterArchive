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
import UploadPeopleForm from "../pages/people/UploadPeopleForm";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { toast } from "sonner";
import { Input } from "./input";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";

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
    const [newOption, setNewOption] = React.useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const { listMedias } = useMediaStore();
    React.useEffect(() => {
      setSelectedValues(defaultValue);
    }, [defaultValue]);
    const [displayedUsers, setDisplayedUsers] = React.useState<any>([]);

    const toggleOption = (value: number) => {
      if (!newOption) {
        const newSelectedValues = selectedValues.people.includes(value)
          ? selectedValues.people.filter((v) => v !== value)
          : [...selectedValues.people, value];

        setSelectedValues({ roleId: role.id, people: newSelectedValues });
        onValueChange({ roleId: role.id, people: newSelectedValues });
      }
    };

    const handleClear = () => {
      setSelectedValues({ roleId: role.id, people: [] });
      onValueChange({ roleId: role.id, people: [] });
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(true);
    const [searchKey, setSearchKey] = React.useState<string>();
    const [query, setQuery] = React.useState<string>("");
    const [filteredItems, setFilteredItems] = React.useState<People[] | null>(
      []
    );

    const { getPeople, allPeople } = usePeopleStore();

    const fetchUsers = async () => {
      try {
        const params: { page: number; search?: string } = { page: page };

        // اگر query طولش بیشتر از 3 کاراکتر باشد، به عنوان search اضافه می‌شود
        if (query.length > 2) {
          params.search = query;
        }
        const response = await getPeople(page, 40, params.search);
        const newUsers = response;

        // چک کردن اگر داده‌ای برنگشت
        if (newUsers.length === 0) {
          setHasMore(false);
        } else {
          setFilteredItems([...(filteredItems ?? []), ...newUsers]);
          setPage(page + 1); // صفحه بعدی را برای بارگذاری تنظیم می‌کنیم
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // تابع برای ارسال فرم جستجو
    const handleSearchSubmit = () => {
      if (searchKey?.length! > 2 || searchKey?.length === 0) {
        handleResetGetPeople();
        setQuery(searchKey!); // مقدار جستجو را در query ذخیره می‌کنیم تا API فراخوانی شود
      }
    };
    const handleResetGetPeople = async () => {
      setFilteredItems([]); // پاک کردن لیست کاربران
      setPage(1); // بازگشت به صفحه 1
      setHasMore(true); // فعال کردن دوباره بارگذاری
      // مقدار جستجو را در query ذخیره می‌کنیم تا API فراخوانی شود
    };

    React.useEffect(() => {
      if (isPopoverOpen) {
        fetchUsers();
      } // بارگذاری کاربران زمانی که query تغییر کند (برای جستجو)
    }, [query, isPopoverOpen]);

    React.useEffect(() => {
      handleSearchSubmit();
    }, [searchKey]);

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
              <div className="flex items-center gap-3 m-3">
                <Input
                  placeholder="جست و جو"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <Sheet open={newOption} onOpenChange={setNewOption}>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <PlusCircle className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <UploadPeopleForm
                      resetGetPeople={handleResetGetPeople}
                      open={newOption}
                      setOpen={setNewOption}
                    />
                  </SheetContent>
                </Sheet>
              </div>
              <CommandList className="overflow-hidden">
                <CommandEmpty>کاربری یافت نشد</CommandEmpty>
                {/* <CommandGroup>
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
                <CommandSeparator /> */}

                <div className="overflow-auto h-[300px]" id="scrollableDiv">
                  <InfiniteScroll
                    dataLength={filteredItems?.length!}
                    next={fetchUsers}
                    hasMore={hasMore}
                    loader={<p className="overflow-hidden">در حال بارگذاری</p>}
                    scrollableTarget="scrollableDiv"
                  >
                    {filteredItems?.map((option) => {
                      const isSelected = selectedValues.people.includes(
                        option.id
                      );
                      return (
                        <CommandItem
                          key={option.id}
                          onSelect={() => toggleOption(option.id)}
                          className="cursor-pointer"
                          value={option.firstName + " " + option.lastName}
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

                          {option.startYear && (
                            <p className="mr-2 text-gray-500 text-xs">
                              دهه {option.startYear?.toString().slice(-2)}{" "}
                            </p>
                          )}
                        </CommandItem>
                      );
                    })}
                  </InfiniteScroll>
                </div>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-wrap items-center">
            {selectedValues.people.map((value) => {
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
                    {option?.startYear && (
                      <p className=" text-gray-500 text-xs">
                        {option?.startYear?.toString().slice(-2)}{" "}
                      </p>
                    )}
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
          </div>
        </div>
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
