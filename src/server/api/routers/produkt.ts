import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const produktRouter = createTRPCRouter({
    FindAllProductsWithCategory: publicProcedure
        .input(z.object({ category: z.string() }))
        .query(async ({ ctx, input }) => {
            const data = ctx.db.produkty.findMany({
                where: {
                    tagi: input.category
                },
                include: {
                    zdjecia: true,
                }
            })
            return await data
        }),
    FindProduct: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const data = ctx.db.produkty.findUnique({
                where: {
                    id: input.id
                },
                include: {
                    zdjecia: true,
                }
            })
            return await data
        }),
    FindNewProducts: publicProcedure
        .query(async ({ ctx }) => {
            const data = ctx.db.produkty.findMany({
                orderBy: {
                    createdAt: 'asc',
                },
                take: 6,
                include: {
                    zdjecia: true,
                }
            })
            return await data
        }),
        FindProductsByIds: publicProcedure
        .input(z.object({ ids: z.array(z.string()) }))
        .query(async ({ ctx, input }) => {
           return await ctx.db.produkty.findMany({
               where: {
                   id: {
                       in: input.ids
                   }
               },
               include: {
                   zdjecia: true,
               }
           }) 
        }),
    CreateProduct: protectedProcedure
        .input(z.object({
            name: z.string(),
            description: z.string(),
            quantity: z.number(),
            price: z.number(),
            tag: z.string(),
            imageURls: z.array(z.string()),
        })).mutation(async ({ ctx, input }) => {
            const produkt = await ctx.db.produkty.create({
                data: {
                    nazwa: input.name,
                    opis: input.description,
                    ilosc: input.quantity,
                    cena: input.price,
                    tagi: input.tag,
                },
            })
            const zdjecia = input.imageURls.map(async (url) => {
                await ctx.db.zdjecia.create({
                    data:
                    {
                        link: url,
                        produktyId: produkt.id
                    }
                })
            })
            if (zdjecia && produkt) {
                return {
                    success: true
                }
            } else {
                return {
                    success: false
                }
            }
        }),
    DeleteAllProducts: protectedProcedure
        .mutation(async ({ ctx }) => {
            await ctx.db.produkty.deleteMany()
            return {
                success: true
            }
        }),
    DeleteProduct: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.produkty.delete({
                where: {
                    id: input.id
                }
            })
            return {
                success: true
            }
        }),
    UpdateCountProtuct: protectedProcedure
        .input(z.object({ id: z.string(), count: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const produkt = await ctx.db.produkty.findUnique({
                where: {
                    id: input.id
                }
            })
            if (produkt) {
                await ctx.db.produkty.update({
                    where: {
                        id: input.id
                    },
                    data: {
                        ilosc: produkt?.ilosc - input.count
                    }
                })

                return {
                    success: true
                }
            }
            return {
                success: false
            }
        }),
});
