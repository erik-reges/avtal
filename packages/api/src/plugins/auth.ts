import { Elysia } from "elysia";
import type { Session, User } from "better-auth";
import { createDB } from "@avtal/db";
import { betterAuth as bAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { user, session, verification, account } from "@avtal/db/drizzle/schema";
import { database } from "./db";

const Domains: Record<string, string> = {
  development: "localhost",
  production: "avtal-api.fly.dev",
};

type Auth = {
  session: Session;
  user: User;
} | null;

const betterAuth = bAuth({
  appName: "avtal",
  schema: {
    user,
    session,
    verification,
    account,
  },
  trustedOrigins: ["http://localhost:8080"],
  secret: process.env.BETTER_AUTH_SECRET!,
  basePath: "/api/auth",
  // trustedOrigins: [`${process.env.FRONTEND_URL}`],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  advanced: {
    // defaultCookieAttributes: {
    //   sameSite: config.env === "production" ? "None" : "Lax",
    //   secure: config.env === "production",
    //   httpOnly: config.env === "production",
    //   domain: Domains[config.env],
    // },
    // useSecureCookies: config.env === "production",
    // crossSubDomainCookies: {
    //   enabled: config.env === "production",
    //   domain: Domains[config.env],
    // },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  logger: {
    disabled: false,
    level: "debug",
    log(level, message, ...args) {
      const timestamp = new Date().toISOString();
      const prefix = `[BetterAuth] ${timestamp} ${level.toUpperCase()}:`;
      if (level === "error") {
        console.error(prefix, message, ...args);
      } else {
        console.log(prefix, message, ...args);
      }
    },
  },
  database: drizzleAdapter(database, {
    provider: "pg",
  }),
});

export const auth = new Elysia({
  name: "auth",
}).derive({ as: "scoped" }, async ({ request, error }) => {
  // @ts-ignore
  const auth: Auth = await betterAuth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: request.headers,
  });

  if (!auth) {
    return error(401, "Unauthorized");
  }

  return auth;
});

export const handler = betterAuth.handler;
