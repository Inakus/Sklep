import { produktRouter } from "~/server/api/routers/produkt";
import { userRouter } from "~/server/api/routers/user";
import { zamowieniaRouter } from "~/server/api/routers/zamowienia";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  produkt: produktRouter,
  zamowienia: zamowieniaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
