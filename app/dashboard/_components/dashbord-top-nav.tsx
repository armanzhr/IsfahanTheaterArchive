"use client";

import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserProfile } from "@/components/user-profile";
import config from "@/config";
import { manageItems, dashboardMenuItems } from "@/utils/menu-items";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { Banknote, Folder, HomeIcon, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  const items = dashboardMenuItems();
  const manage = manageItems();
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <HamburgerMenuIcon />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>تئاتر اصفهان</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              {items.map((item) => (
                <DialogClose key={item.name} asChild>
                  <Link
                    key={item.name}
                    className={clsx(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                      {
                        "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                          pathname === item.pathname,
                      }
                    )}
                    href={item.pathname}
                  >
                    <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                </DialogClose>
              ))}
              <Separator />
              {manage.map((item) => (
                <DialogClose key={item.name} asChild>
                  <Link
                    key={item.name}
                    className={clsx(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                      {
                        "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                          pathname === item.pathname,
                      }
                    )}
                    href={item.pathname}
                  >
                    <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                </DialogClose>
              ))}
            </div>
          </SheetContent>
        </Dialog>
        <div className="w-full flex justify-between  items-center gap-2 ml-auto">
          <ModeToggle />
          <UserProfile />
        </div>
      </header>
      {children}
    </div>
  );
}
