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
  const [filteredItems, setFilteredItems] = useState<PeopleType[] | null>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchKey, setSearchKey] = useState<string>();
  const [query, setQuery] = useState<string>("");

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
      setFilteredItems([]); // پاک کردن لیست کاربران
      setPage(1); // بازگشت به صفحه 1
      setHasMore(true); // فعال کردن دوباره بارگذاری
      setQuery(searchKey!); // مقدار جستجو را در query ذخیره می‌کنیم تا API فراخوانی شود
    }
  };

  useEffect(() => {
    fetchUsers(); // بارگذاری کاربران زمانی که query تغییر کند (برای جستجو)
  }, [query]);

  useEffect(() => {
    handleSearchSubmit();
  }, [searchKey]);

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

  return (
    <>
      <div className="flex gap-3">
        <Button onClick={() => handleCreatePeople()}>کاربر جدید</Button>
        <Input
          dir="rtl"
          className="border focus-visible:ring-transparent"
          placeholder="جست و جو"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>

      <div
        dir="rtl"
        className="h-[calc(100vh-200px)] overflow-auto"
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={filteredItems?.length!}
          next={fetchUsers}
          hasMore={hasMore}
          loader={<p>درحال بارگذرای...</p>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden"
          scrollableTarget="scrollableDiv"
        >
          {filteredItems?.map((item: PeopleType) => (
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
