import { FC } from "react";
import ReauthorizeButton from "./ReauthorizeButton";

interface Props {}

const UnauthorizedNotice: FC<Props> = () => {
  return (
    <>
      <p>
        Je moet aangemeld zijn als leiding om het haegeprekerke te bewerken.
      </p>
      <ReauthorizeButton />
    </>
  );
};

export default UnauthorizedNotice;
