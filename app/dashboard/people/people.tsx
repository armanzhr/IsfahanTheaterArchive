import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { items } from "./test";
import { PencilIcon, TrashIcon, UserIcon } from "lucide-react";

import UploadPeople from "@/components/pages/people/UploadPeople";
import { People as PeopleType } from "@/utils/types";
import DeletePeople from "@/components/pages/people/DeletePeople";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import SkeletonLoading from "@/components/pages/people/SkeletonLoading";
import { toast } from "sonner";
import config from "@/config";
import { useMediaStore } from "@/service/store/useMediaStore";
import { debounce } from "@/utils/functions/debounce";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const { getPeople, people, isGettingPeople } = usePeopleStore();
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState<PeopleType | null>();
  const { listMedias, getMediasList } = useMediaStore();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<PeopleType[] | null>();

  const debouncedFilter = debounce((input: string) => {
    console.log("Filtering for:", input);
    // منطق فیلترینگ کاربران
  }, 300);

  const handleFilterItems = () => {
    setFilteredItems(
      people?.filter((item) =>
        `${item.firstName} ${item.firstName}`.includes(searchInputValue)
      )
    );
  };

  useEffect(() => {
    handleFilterItems();
  }, [searchInputValue]);

  const fetchPeople = async () => {
    try {
      const res = await getPeople();
    } catch (error) {
      toast.error("خطا در دریافت لیست عوامل");
    }
  };
  useEffect(() => {
    setFilteredItems(people);
    if (!people) {
      fetchPeople();
    }
  }, [people]);

  const handleCreatePeople = () => {
    setEditValue(null);
    setOpen(true);
  };
  const handleEditPeople = (item: PeopleType) => {
    setEditValue(item);
    setOpen(true);
  };
  const fetchMedias = async () => {
    try {
      const res = await getMediasList();
    } catch (error) {
      toast.error("خطا در دریافت لیست رسانه ها");
    }
  };
  useEffect(() => {
    if (!listMedias) {
      fetchMedias();
    }
  }, [listMedias]);

  const [displayedUsers, setDisplayedUsers] = useState(filteredItems);

  const fetchMoreData = () => {
    console.log("before time");
    setTimeout(() => {
      console.log("fetched");
      setDisplayedUsers(filteredItems?.slice(0, displayedUsers?.length! + 50));
    }, 1000);
  };

  useEffect(() => {
    console.log(displayedUsers);
  }, [displayedUsers]);

  useEffect(() => {
    setDisplayedUsers(filteredItems?.slice(0, 50));
  }, [filteredItems]);
  return (
    <>
      <div className="flex gap-3">
        <Button onClick={() => handleCreatePeople()}>کاربر جدید</Button>
        <Input
          dir="rtl"
          className="border focus-visible:ring-transparent"
          placeholder="جست و جو"
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
        />
      </div>
      <div dir="rtl">
        <InfiniteScroll
          dataLength={displayedUsers?.length!}
          next={fetchMoreData}
          hasMore={displayedUsers?.length! < filteredItems?.length!}
          loader={<p>درحال بارگذرای...</p>}
          className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
        >
          {displayedUsers?.map((item) => (
            <>
              <div className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-zinc-900 transition ease-in-out duration-300 p-2 rounded-md">
                <div className="flex items-center gap-3">
                  <Avatar className=" h-12 w-12 sm:flex">
                    <AvatarImage
                      src={
                        item.avatarImageId
                          ? `${config.fileURL}/${
                              listMedias?.find(
                                (image) => image.id === item.avatarImageId
                              )?.url
                            }`
                          : ""
                      }
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      <UserIcon className="opacity-50" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {item.firstName} {item.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEditPeople(item)}
                    variant="outline"
                    className="h-8 w-8"
                    size="icon"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <DeletePeople people={item} />
                </div>
              </div>
            </>
          ))}
        </InfiniteScroll>
      </div>

      <UploadPeople editValue={editValue} setOpen={setOpen} open={open} />
    </>
  );
};

export default People;
