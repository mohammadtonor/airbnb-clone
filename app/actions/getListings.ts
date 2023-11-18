import prisma from "@/app/libs/prismadb";
import { Anybody } from "next/font/google";

export default async function getListing() {
    try {
        const listing = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return listing;
    } catch (error: any) {
        throw new Error(error)
    }    
}