import UnauthorizedNotice from "@/components/ui/UnuauthorizedNotice/UnauthorizedNotice";
import { FC } from "react";

interface Props {}

const Unauthorized: FC<Props> = () => {
  return <UnauthorizedNotice />;
};

export default Unauthorized;
