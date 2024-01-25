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
            const zdjecia = input.imageURls.map((url) => {
                void ctx.db.zdjecia.create({
                data: 
                    {
                        link: url,
                        produktyId: produkt.id
                    }
                })
            })
            if(zdjecia && produkt) {
                return {
                    success: true
                }
            }else{
                return {
                    success: false
                }
            }
        })
});
