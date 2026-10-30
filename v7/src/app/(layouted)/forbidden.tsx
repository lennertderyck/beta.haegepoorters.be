import UnauthorizedNotice from "@/components/ui/UnuauthorizedNotice/UnauthorizedNotice";
import { FC } from "react";

interface Props {}

const Forbidden: FC<Props> = () => {
  return <UnauthorizedNotice />;
};

export default Forbidden;
