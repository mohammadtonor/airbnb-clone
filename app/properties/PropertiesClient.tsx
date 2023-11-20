'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCallback, useState } from 'react';

import { SafeListing, SafeReservation, SafeUser } from '../types';

import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';

interface PropertiesClientProps {
    listings: SafeListing[],
    currentUser: SafeUser | null
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')
    
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listing/${id}`)
         .then(() => {
             toast.success('deleted Properties!') 
             router.refresh()
         })
        .catch((error) => {
            toast.error(error?.response?.data?.error);    
        })
        .finally(() => {
            setDeletingId('');    
        })
    }, [])

    return (
        <Container>
            <Heading
                title='Trips'
                subtitle="Where you've been and where you're going"
            />
            <div
              className='
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
              '
            >
                {listings.map((listings: any) => (
          <ListingCard
            key={listings.id}
            data={listings}
            actionId={listings.id}
            onAction={onCancel}
            disabled={deletingId === listings.id}
            actionLabel="Delete properties"
            currentUser={currentUser}
          />
        ))}
            </div>
        </Container>
    );
}
 
export default PropertiesClient