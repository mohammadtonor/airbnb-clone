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

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListing = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toString(),
        })) 
        return safeListing;
    } catch (error: any) {
        throw new Error(error)
    }    
}