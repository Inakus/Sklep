import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const zamowieniaRouter = createTRPCRouter({
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
        .input(z.object({ userId: z.string().nullish() }))
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
        .input(z.object({ userId: z.string().optional(), price: z.number(), email: z.string().email(), products: z.array(z.object({ id: z.string(), quantity: z.number(),  })) }))
        .mutation(async ({ ctx, input }) => {
            const zamowienie = await ctx.db.zamowienia.create({
                data: {
                    uzytkowikId: input.userId,
                    email: input.email,
                    status: 'w trakcie realizacji',
                    cena: input.price,
                    ZamowioneProdukty: {
                        create: input.products.map((product) => {
                            return {
                                produktyId: product.id,
                                ilosc: product.quantity
                            }
                        })
                    }
                }
            })
            // const zamowioneProdukty = input.products.map(async (product) => {
            //     await ctx.db.zamowioneProdukty.create({
            //         data: {
            //             produktyId: product.id,
            //             ilosc: product.quantity,
            //             zamowieniaId: zamowienie.id,
            //         }
            //     })
            // })
            if (zamowienie) {
                return { message: 'Success', status: 200, orderId: zamowienie.id };
            }
        })
})