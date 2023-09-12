import { getProviders } from "next-auth/react";

export async function getOAuthSignInMethods(context) {
  const providers = Object.values(await getProviders());
  return providers;
}
