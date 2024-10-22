import ShowDetails from "@/components/homepage/shows/show-details";
import config from "@/config";
import { Show } from "@/utils/types";
import React from "react";

const Page = async ({ params }: { params: { showID: string } }) => {
  let data = await fetch(config.baseURL + "/Shows/" + params.showID);
  let posts: Show = await data.json();
  console.log(posts);
  return (
    <div className="w-full">
      <ShowDetails />
    </div>
  );
};

export default Page;
