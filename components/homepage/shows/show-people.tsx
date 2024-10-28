import { ShowPeople } from "@/utils/types";
import React from "react";

const ShowPeople = ({ people }: { people: ShowPeople[] }) => {
  return (
    <div>
      {people.map((item) => (
        <div>{item.firstName}</div>
      ))}
    </div>
  );
};

export default ShowPeople;
