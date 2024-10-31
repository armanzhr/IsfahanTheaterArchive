"use client";
import Link from "next/link";
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { UserProfile } from "../user-profile";
import ModeToggle from "../mode-toggle";
import { BlocksIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import config from "@/config";
import { cn } from "@/lib/utils";
import { Dialog, DialogClose } from "@radix-ui/react-dialog";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { clientMenuItems } from "@/utils/menu-items";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

export default function NavBar() {
  let userId = null;
  const pathname = usePathname();
  const items = clientMenuItems();

  return (
    <div
      className={clsx(
        "flex min-w-full fixed justify-between p-2 border-y z-10 dark:bg-black dark:bg-opacity-50 bg-white transition-transform bg-opacity-50 backdrop-blur-[12px]"
      )}
    >
      <div className="flex justify-between w-full min-[825px]:hidden">
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
                <SheetTitle>آرشیو تئاتر اصفهان</SheetTitle>
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
            </div>
          </SheetContent>
        </Dialog>

        <ModeToggle />
      </div>
      <NavigationMenu dir="rtl">
        <NavigationMenuList>
          {items.map((item, index) => (
            <>
              <NavigationMenuItem key={index} className="max-[825px]:hidden">
                <Link href={item.pathname} legacyBehavior passHref>
                  <Button variant="ghost" className="flex gap-1">
                    <div>{item.icon}</div>
                    <span className="text-sm">{item.name}</span>
                  </Button>
                </Link>
              </NavigationMenuItem>
            </>
          ))}
          <Separator orientation="vertical" />
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2 max-[825px]:hidden">
        <ModeToggle />
      </div>
    </div>
  );
}
