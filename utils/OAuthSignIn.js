import { getProviders } from "next-auth/react";

export async function getOAuthSignInMethods() {
  const providers = Object.values(await getProviders());
  return providers;
}
