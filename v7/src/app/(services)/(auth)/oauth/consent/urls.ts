export const consentURL = (authorizationId: string, error?: string) => {
  const params = new URLSearchParams({ authorization_id: authorizationId });
  if (error) params.set("error", error);
  return "/oauth/consent?" + params.toString();
};
