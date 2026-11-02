"use client";

import Button from "@/components/basics/Button/Button";
import Icon from "@/components/basics/Icon/Icon";
import Input from "@/components/basics/Input/Input";
import Notice from "@/components/basics/Notice/Notice";
import { FC, useState, useTransition } from "react";
import { createInviteAction } from "./actions";

const InviteForm: FC = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onCreateButtonClick = () =>
    startTransition(async () => {
      setError(null);
      setUrl(null);
      setIsCopied(false);
      const result = await createInviteAction();

      if (result.error) return setError(result.error);
      setUrl(result.url);
    });

  const onCopyButtonClick = async () => {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <Button type="button" disabled={isPending} onClick={onCreateButtonClick}>
        <Icon name="link" />
        Link aanmaken
      </Button>
      {error && <Notice>{error}</Notice>}
      {url && (
        <div className="flex flex-col gap-3">
          <Input value={url} readOnly onFocus={(e) => e.target.select()} />
          <Button type="button" variant="secondary" onClick={onCopyButtonClick}>
            <Icon name={isCopied ? "check-line" : "file-copy-line"} />
            {isCopied ? "Gekopieerd" : "Link kopiëren"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default InviteForm;
