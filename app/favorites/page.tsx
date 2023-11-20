import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/grtFavoriteListing"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import FavoritesClient from "./FavoritesClient";


const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = getCurrentUser();

    
    
    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Look like you have no favorites listing"
                />
          </ClientOnly>  
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage