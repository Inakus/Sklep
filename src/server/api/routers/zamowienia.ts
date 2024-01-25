import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const produktRouter = createTRPCRouter({
    FindAllOrders: protectedProcedure
    .query(async ({ ctx }) => {
        const data = ctx.db.zamowienia.findMany({
            include: {
                ZamowioneProdukty: true
            }
        })
        return await data
    }),
    FindAllOrdersByUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
        const data = ctx.db.zamowienia.findMany({
            where: {
                uzytkowikId: input.userId
            },
            include: {
                ZamowioneProdukty: true
            }
        })
        return await data
    }),
    ChangeStatus: protectedProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
        await ctx.db.zamowienia.update({
            where: {
                id: input.id
            },
            data: {
                status: input.status
            }
        })
        return { message: 'Success', status: 200 };
    }),
    AddOrder: publicProcedure
    .input(z.object({ userId: z.string().nullish(), email: z.string().email(), products: z.array(z.object({id: z.string(), quantity: z.number()})) }))
    .mutation(async ({ ctx, input }) => {
        const zamowienie = await ctx.db.zamowienia.create({
            data: {
                uzytkowikId: input.userId,
                email: input.email,
                status: 'w trakcie realizacji'
            }
        })
        const zamowioneProdukty = input.products.map((product) => {
            for(let i = 0; i < product.quantity; i++){
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                void ctx.db.zamowioneProdukty.create({
                    data: {
                        produktyId: product.id,
                        zamowieniaId: zamowienie.id
                    }
                })
            }
        })
        if(zamowioneProdukty && zamowienie) {
            return { message: 'Success', status: 200 };
        }
    })
})