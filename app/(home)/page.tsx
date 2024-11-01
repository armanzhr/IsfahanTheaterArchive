import Header from "@/components/homepage/header";
import Shows from "@/components/homepage/shows/shows";
import SideBySide from "@/components/homepage/side-by-side";
import config from "@/config";
import { getShows } from "@/service/api/shows";
import { Show, ShowResponse } from "@/utils/types";
import React from "react";

const page = async () => {
  let shows: ShowResponse = await getShows();

  return (
    <>
      <Header />
      <Shows shows={shows.data} />
      <SideBySide />
    </>
  );
};

export default page;
