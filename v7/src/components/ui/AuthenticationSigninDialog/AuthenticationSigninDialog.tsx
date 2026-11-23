import SigninButton from "@/app/(layouted)/(authentication)/auth/signin/SigninButton";
import { LOGO_GROEPSADMINISTRATIE } from "@/assets";
import Button from "@/components/basics/Button/Button";
import Dialog, {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/basics/Dialog/Dialog";
import Icon from "@/components/basics/Icon/Icon";
import Image from "next/image";
import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<typeof DialogTrigger> {
  memberName: string | null;
}

const AuthenticationSigninDialogButton: FC<Props> = ({
  children,
  memberName,
  ...otherProps
}) => {
  const isKnownMember = !!memberName;

  return (
    <Dialog>
      <DialogTrigger {...otherProps}>{children || "Open"}</DialogTrigger>
      <DialogContent intent="optional">
        <DialogHeader className="mb-2">
          <Image
            src={LOGO_GROEPSADMINISTRATIE}
            alt="Groepsadministratie Logo"
            className="mx-auto mb-2"
            width={100}
            height={100}
          />
          <div>
            <DialogTitle className="text-xl leading-5 text-center mb-2">
              Aanmelden bij de groepsadministratie
            </DialogTitle>
            <DialogDescription className="text-md text-center">
              Voor leden en ouders
            </DialogDescription>
          </div>
        </DialogHeader>
        <SigninButton provider="keycloak">
          <button className="bg-neutral-50 flex items-center justify-center gap-2 p-4 rounded-lg w-full text-center font-semibold text-shadow-neutral-800 cursor-pointer">
            <span className="visible in-data-[pending=true]:hidden">
              Doorgaan als lid of ouder
            </span>
            <Icon
              name="arrow-right-line"
              className="visible in-data-[pending=true]:hidden"
            />
            <Icon
              name="loader-2-line"
              className="visible in-data-[pending=false]:hidden animate-spin"
            />
          </button>
        </SigninButton>
        <Button variant="tertiary" className="mx-auto">
          Of ga verder als Webmaster
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationSigninDialogButton;
