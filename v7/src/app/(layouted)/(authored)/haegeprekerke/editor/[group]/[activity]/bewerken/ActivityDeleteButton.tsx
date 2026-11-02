"use client";

import Button from "@/components/basics/Button/Button";
import Icon from "@/components/basics/Icon/Icon";
import { useRouter } from "next/navigation";
import { FC, useActionState, useTransition } from "react";
import { deleteActivityAction } from "./ActivityDeleteButton.actions";

interface Props {
  activityId: string;
  redirectUrl?: string;
}

const ActivityDeleteButton: FC<Props> = ({ activityId, redirectUrl }) => {
  const router = useRouter();
  const [, formDeleteAction] = useActionState(async () => {
    try {
      // Implement the delete activity mutation here
      await deleteActivityAction(activityId);
      if (redirectUrl) {
        router.push(redirectUrl);
      }
    } catch (error) {
      console.log({ error });
    }
  }, null);
  const [transition, startTransition] = useTransition();

  const onDeleteButtonClick = () => startTransition(formDeleteAction);

  return (
    <Button
      className="mt-4"
      type="button"
      variant="tertiary"
      disabled={transition}
      onClick={onDeleteButtonClick}
    >
      Activiteit verwijderen
      <Icon name="delete-bin-2-line" />
    </Button>
  );
};

export default ActivityDeleteButton;
