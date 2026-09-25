export const composeCallbackURL = (callbackRoute: string) => {
  return new URL(callbackRoute, process.env.AUTH_URL);
};
