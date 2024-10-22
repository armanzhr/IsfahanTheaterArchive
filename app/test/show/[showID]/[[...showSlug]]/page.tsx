import ShowDetails from "@/components/homepage/shows/show-details";
import config from "@/config";
import { Show } from "@/utils/types";
import React from "react";

const Page = async ({
  params,
}: {
  params: { showID: string; showSlug: string };
}) => {
  let data = await fetch(config.baseURL + "/Shows/" + params.showID);
  let show: Show = await data.json();

  return (
    <div className="w-full">
      <ShowDetails show={show} />
    </div>
  );
};

export default Page;
