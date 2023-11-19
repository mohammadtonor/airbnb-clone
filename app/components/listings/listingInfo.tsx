'use client';

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from 'next/dynamic'
import useCountries from "@/app/hooks/useCountries";

const Map = dynamic(() => import('../Map'), {
    ssr: false
})

interface ListingInfoProps {
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;  
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string;
    user: SafeUser | null;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    description,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    locationValue,
    user
}) => {
    
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="
                        tex-xl
                        font-semibold 
                        flex 
                        flex-row
                        items-center
                        gap-2
                    "
                >
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} /> 
                </div>
                <div className="
                        flex 
                        flex-row
                        items-center
                        gap-4
                        font-light
                   ">
                    <div>
                        {guestCount} guest
                    </div>
                    <div>
                        {roomCount} rooms
                    </div>
                    <div>
                        {bathroomCount} bathroomCount
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={coordinates}/>
        </div>
    );
};

export default ListingInfo;
