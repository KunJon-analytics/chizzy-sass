import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

import { env } from "@/env.mjs";

export const { useSession } = createAuthClient({
  //you can pass client configuration here
  baseURL: env.NEXT_PUBLIC_APP_URL,
});
