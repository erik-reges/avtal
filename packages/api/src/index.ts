import { Elysia } from "elysia";
import { userRouter } from "./routes/user";
import cors from "@elysiajs/cors";
import { config } from "./lib/config";
import { handler } from "./plugins/auth";
import { generateRouter } from "./routes/generate2";
import { compression } from "elysia-compress";

export const api = new Elysia({ prefix: "/api" })

  .use(
    cors({
      origin: "http://localhost:8080",
    }),
  )
  .all("/auth/*", async ({ request, error }) =>
    !["POST", "GET"].includes(request.method) ? error(405) : handler(request),
  )

  .get("/health", () => `healthy server`)
  .use(generateRouter)
  .use(userRouter);

api.listen({ idleTimeout: 255, port: config.port });

console.log(`🍣 api is ready: ${config.apiBaseUrl}/api`);

export type App = typeof api;
