"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/basics/Select/Select";
import type { CmsGroup } from "@/lib/server/queries/groups";
import { FC } from "react";

interface Props {
  defaultValue: string | null;
  activityGroups: CmsGroup[];
}

const ActivityFormGroupSelector: FC<Props> = ({
  activityGroups,
  defaultValue
}) => {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue>
          {(value) =>
            activityGroups.find((group) => group._id === value)?.name ??
            "Kies een groep"
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {activityGroups.map((group) => (
          <SelectItem key={group._id} value={group._id}>
            {group.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ActivityFormGroupSelector;
