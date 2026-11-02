"use client";

import Button from "@/components/basics/Button/Button";
import Icon from "@/components/basics/Icon/Icon";
import { FC, useState, useTransition } from "react";
import { deletePasskeyAction } from "./actions";

interface Props {
  passkeyId: string;
}

const DeletePasskeyButton: FC<Props> = ({ passkeyId }) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onDeleteButtonClick = () =>
    startTransition(async () => {
      const { error } = await deletePasskeyAction(passkeyId);
      setError(error);
    });

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        variant="tertiary"
        disabled={isPending}
        onClick={onDeleteButtonClick}
      >
        Verwijderen
        <Icon name="delete-bin-2-line" />
      </Button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DeletePasskeyButton;
