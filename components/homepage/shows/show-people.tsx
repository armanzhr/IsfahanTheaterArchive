import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import config from "@/config";
import { ShowPeople as ShowPeopleType } from "@/utils/types";
import { UserCircle, UserIcon } from "lucide-react";
import React from "react";

const ShowPeople = ({ people }: { people: ShowPeopleType[] }) => {
  const groupedData: Record<string, ShowPeopleType[]> = people.reduce(
    (acc, item) => {
      acc[item.name] = acc[item.name] || [];
      acc[item.name].push(item);
      return acc;
    },
    {} as Record<string, ShowPeopleType[]>
  );

  return (
    <div>
      {Object.keys(groupedData).map((item) => (
        <div className="flex items-center gap-3" key={item}>
          <span className="text-sm font-semibold">{item}:</span>
          <div>
            {groupedData[item].map((person, index) => (
              <Badge key={index} variant="secondary" className="h-8 m-1 p-0">
                <Avatar className=" h-7 w-7 sm:flex">
                  <AvatarImage
                    src={`${config.fileURL}/${person.avatarImageUrl}`}
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    <UserCircle className="opacity-50 h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="pl-2">
                  {person.firstName} {person.lastName}
                </span>
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowPeople;
