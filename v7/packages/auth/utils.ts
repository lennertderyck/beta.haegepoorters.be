export const composeCallbackURL = (callbackRoute: string) => {
  return new URL(callbackRoute, process.env.NEXT_PUBLIC_AUTH_URL);
};
