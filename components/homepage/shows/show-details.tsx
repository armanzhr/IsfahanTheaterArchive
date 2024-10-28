import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Show } from "@/utils/types";
import { ChevronLeft, EyeIcon, Share2 } from "lucide-react";
import React from "react";
import ShowBreadcrumb from "./show-breadcrumb";
import { Button } from "@/components/ui/button";
import config from "@/config";
import ShowPeople from "./show-people";

const ShowDetails = ({ show }: { show: Show }) => {
  return (
    <div className="w-full">
      <header className=" grid grid-cols-4 gap-5 h-full">
        <aside className="col-span-1">
          <img
            loading="lazy"
            src={`${config.fileURL}/${show.posterImageUrl}`}
            alt="Image"
            className="w-full h-96 object-cover rounded-xl group-hover:brightness-50 duration-500 transition-all"
          />
          <p className="text-sm mt-2 flex gap-1 opacity-50">
            <span>
              <EyeIcon className="h-5 w-5" />
            </span>
            <span className="font-semibold">50</span>
          </p>
        </aside>
        <main className=" col-span-3">
          <header className="h-14 flex items-center justify-between">
            <ShowBreadcrumb title={show.title} />
            <div>
              <Button className="h-7 w-7" variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <Separator />
          <div>
            <ShowPeople people={show.showPeopleRoles} />
          </div>
        </main>
      </header>
    </div>
  );
};

export default ShowDetails;
