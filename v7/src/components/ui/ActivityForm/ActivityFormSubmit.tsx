import Button from "@/components/basics/Button/Button";
import { FC } from "react";

interface Props {}

const ActivityFormSubmit: FC<Props> = () => {
  const pending = false; // Replace with actual pending state from context or props
  const intent = "create"; // Replace with actual intent from context or props

  return (
    <Button className="mt-4" type="submit" disabled={pending}>
      {intent === "create" ? "Activiteit toevoegen" : "Activiteit bijwerken"}
    </Button>
  );
};

export default ActivityFormSubmit;
