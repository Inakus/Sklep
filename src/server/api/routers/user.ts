import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    deleteUser: protectedProcedure.input(z.object({userId: z.string()})).mutation(async ({input}) => {
        if(!input.userId) {
            return { error: 'Error deleting user', status: 500 };
          }
        try {
            await clerkClient.users.deleteUser(input.userId);
            return { message: 'Success', status: 200 };
          }
          catch (error) {
            console.log(error);
            return { error: 'Error deleting user', status: 500 };
          }
    })
})