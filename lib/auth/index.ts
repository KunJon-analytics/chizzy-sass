import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "../prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  advanced: {
    generateId: false,
  },
  user: {
    additionalFields: {
      referredById: {
        type: "string",
        required: false,
        input: true, // allow user to set role
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
