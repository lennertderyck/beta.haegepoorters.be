"use client";

import Button from "@/components/basics/Button/Button";
import { FC } from "react";
import { clearAllStaffMutation } from "./actions";

interface Props {}

const DeleteAllStaffButton: FC<Props> = () => {
  return (
    <Button onClick={clearAllStaffMutation}>Alle leiding verwijderen</Button>
  );
};

export default DeleteAllStaffButton;
