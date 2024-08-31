"use client";

import { Separator } from "@/components/ui/separator";
import { menuItems } from "@/utils/menu-items";
import clsx from "clsx";
import {
  Banknote,
  Folder,
  HomeIcon,
  MapPin,
  Settings,
  Theater,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSideBar() {
  const pathname = usePathname();
  const items = menuItems();
  return (
    <div className="lg:block hidden border-l h-full">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
          <Link className="flex items-center gap-2 font-semibold ml-1" href="/">
            <span className="">تئاتر اصفهان</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2 ">
          <nav className="grid items-start px-4 text-sm font-medium">
            {items.map((item) => (
              <Link
                key={item.name}
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
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
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
