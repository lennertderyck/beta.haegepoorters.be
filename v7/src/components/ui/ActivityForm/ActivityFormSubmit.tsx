import Button from "@/components/basics/Button/Button";
import { FC } from "react";
import { useActivityContext } from "./ActivityForm.context";

interface Props {}

const ActivityFormSubmit: FC<Props> = () => {
  const { isFormActionSubmitting, intent } = useActivityContext();

  return (
    <Button className="mt-4" type="submit" disabled={isFormActionSubmitting}>
      {intent === "create" ? "Activiteit toevoegen" : "Activiteit bijwerken"}
    </Button>
  );
};

export default ActivityFormSubmit;
