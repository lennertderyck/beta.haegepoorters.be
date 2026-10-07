import { FC } from "react";
import ReauthorizeButton from "./ReauthorizeButton";

interface Props {}

const UnauthorizedNotice: FC<Props> = () => {
  return (
    <div className="h-full grid place-items-center py-20">
      <p className="mb-2">
        Je moet aangemeld zijn en toegang hebben om dit te bekijken.
      </p>
      <ReauthorizeButton />
    </div>
  );
};

export default UnauthorizedNotice;
