import Icon from "@/components/basics/Icon/Icon";
import Label from "@/components/basics/Label/Label";
import { AuthLoginProvider, Session } from "@/lib/modules/Auth";
import { FC } from "react";
import AuthenticationSigninDialogButton from "../AuthenticationSigninDialog/AuthenticationSigninDialog";
import RootNavigationMenuLink from "./RootNavigationMenuLink";
import RootNavigationMenuLinkContent from "./RootNavigationMenuLinkContent";

interface RootNavigationAccountButtonContentProps {
  loginProviderLabel: string;
  authSessionLabel: string;
}

const RootNavigationAccountButtonContent: FC<
  RootNavigationAccountButtonContentProps
> = ({ loginProviderLabel, authSessionLabel }) => {
  return (
    <div className="flex-1 flex items-center gap-5 px-5">
      <div className="flex-1 flex flex-col items-end *:leading-4">
        <div className="font-serif text-lg">{loginProviderLabel}</div>
        <Label>{authSessionLabel}</Label>
      </div>
      <Icon name="account-circle-line" size="1.5rem" />
    </div>
  );
};

interface RootNavigationAccountButtonProps {
  loginProvider: AuthLoginProvider;
  session: Session;
  isAuthenticated: boolean;
}

const RootNavigationAccountButton: FC<RootNavigationAccountButtonProps> = ({
  loginProvider,
  session,
  isAuthenticated
}) => {
  const name = session?.user?.name || "Aanmelden";

  const signContextLabelMap: Record<NonNullable<AuthLoginProvider>, string> = {
    supabase: "Lokaal beheer",
    keycloak: "Groepsadministratie",
    other: "Onbekende context"
  };

  const signContextLabel =
    signContextLabelMap[loginProvider as NonNullable<AuthLoginProvider>] ||
    signContextLabelMap.keycloak;

  if (!isAuthenticated)
    return (
      <RootNavigationMenuLinkContent>
        <AuthenticationSigninDialogButton
          className="flex-1"
          memberName={session?.user?.name || null}
        >
          <RootNavigationAccountButtonContent
            authSessionLabel={name}
            loginProviderLabel={signContextLabel}
          />
        </AuthenticationSigninDialogButton>
      </RootNavigationMenuLinkContent>
    );
  else
    return (
      <>
        <RootNavigationMenuLink
          href="/ga/profiel"
          className="flex items-center"
        >
          <RootNavigationMenuLinkContent>
            <RootNavigationAccountButtonContent
              authSessionLabel={name}
              loginProviderLabel={signContextLabel}
            />
          </RootNavigationMenuLinkContent>
        </RootNavigationMenuLink>
        {/* <AuthenticationSigninDialogButton /> */}
      </>
    );
};

export default RootNavigationAccountButton;
