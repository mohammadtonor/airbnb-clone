import prisma from "@/app/libs/prismadb";

export interface IlistingParams {
    userId: string
}

export default async function getListing(
    params: IlistingParams
) {
    try {
        const { userId } = params;

        let query: any = {};

        if (userId){
            query.userId = userId;
        }

        const listing = await prisma.listing.findMany({
            where:query,
            orderBy: {
                createdAt: 'desc'
            }
        })
        return listing;
    } catch (error: any) {
        throw new Error(error)
    }    
}