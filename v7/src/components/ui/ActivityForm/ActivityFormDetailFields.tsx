"use client";

import {
    Collapsible,
    CollapsibleContent
} from "@/components/basics/Collapsible/Collapsible";
import { ComponentProps, FC } from "react";
import { useActivityContext } from "./ActivityForm.context";

const ActivityFormDetailFields: FC<ComponentProps<typeof Collapsible>> = ({
  children,
  ...otherProps
}) => {
  const { activityType } = useActivityContext();

  const showDetailFields = activityType !== null && activityType !== "linked";

  return (
    <Collapsible open={showDetailFields} {...otherProps}>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default ActivityFormDetailFields;
