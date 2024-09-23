import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiSelect } from "@/components/ui/multi-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePeopleStore } from "@/service/store/usePeopleStore";
import { useRolesStore } from "@/service/store/useRolesStore";
import React from "react";

const ShowPeople = ({
  selectedPeopleByRole,
  setSelectedPeopleByRole,
}: {
  selectedPeopleByRole: any;
  setSelectedPeopleByRole: any;
}) => {
  const { people, allPeople } = usePeopleStore();
  const { roles } = useRolesStore();
  const handleChangeValue = ({
    roleId,
    people,
  }: {
    roleId: number;
    people: number[];
  }) => {
    // Update the state for the specific role
    setSelectedPeopleByRole((prev: any) => ({
      ...prev, // Copy previous selections
      [roleId]: people, // Update only the specific role's selected people
    }));
  };
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle className="text-lg">عوامل</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col gap-3 h-60">
            <ScrollArea dir="rtl">
              {roles?.map((item) => (
                <div className="flex gap-3 mb-3 items-start" key={item.id}>
                  <p className="text-sm font-semibold">{item.name}</p>

                  <MultiSelect
                    options={allPeople!}
                    onValueChange={handleChangeValue}
                    defaultValue={{
                      roleId: item.id, // Pass the role's ID
                      people: selectedPeopleByRole[item?.id] || [], // Pass selected people specific to this role
                    }}
                    value={{
                      roleId: item.id, // Pass the role's ID
                      people: selectedPeopleByRole[item?.id] || [], // Pass selected people specific to this role
                    }}
                    role={item}
                    placeholder="Select frameworks"
                    variant="default"
                    animation={2}
                    maxCount={10}
                  />
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShowPeople;
