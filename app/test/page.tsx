import Header from "@/components/homepage/header";
import Shows from "@/components/homepage/shows/shows";
import SideBySide from "@/components/homepage/side-by-side";
import config from "@/config";
import { Show, ShowResponse } from "@/utils/types";
import React from "react";

const page = async () => {
  let data = await fetch(config.baseURL + "/Shows");
  let shows: ShowResponse = await data.json();

  return (
    <>
      <Header />
      <Shows shows={shows.data} />
      <SideBySide />
    </>
  );
};

export default page;
