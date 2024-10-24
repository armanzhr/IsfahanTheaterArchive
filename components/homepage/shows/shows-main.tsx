import { ShowInclusive } from "@/utils/types";
import React from "react";
import ShowItem from "./show-item";

const ShowsMain = ({ shows }: { shows: ShowInclusive[] }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {shows.map((show) => (
        <ShowItem key={show.id} item={show} />
      ))}
    </div>
  );
};

export default ShowsMain;
