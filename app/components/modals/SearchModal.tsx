'use client'

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import {  Range } from 'react-date-range';

import Modal from "./Modal";

import useSearchModal from "@/app/hooks/useSearchModal"

import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from "../input/CountrySelec";
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calender from '../input/Calender';
import Counter from '../input/Counter';

enum STEPS {
    LOCATIONS = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATIONS);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomtCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, []);

    const onSubmit = useCallback(() => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        setStep(STEPS.LOCATIONS);
        searchModal.onClose();

        router.push(url);
    },
        [
            step,
            searchModal,
            location,
            roomCount,
            router,
            guestCount,
            bathroomCount,
            dateRange,
            onNext,
            params
        ]);
    
    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATIONS) {
            return undefined;
        }

        return 'Back'
    },[step])


    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='When do you plan to go?'
                subtitle='Make sure everyone free!'
            />
            <CountrySelect
                value={location}
                onChange={(value) => {
                    setLocation(value as CountrySelectValue)
                }}
            />
            <Map
                center={location?.latlng}
            />
        </div>
    );

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='When do you plan to go?'
                    subtitle='Make sure everyone free'
                />
                <Calender
                    value={dateRange}
                    onChange={(value)=> setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='More Information'
                    subtitle='Find your Perfect'
                />
                <Counter
                    title='Guest'
                    subtitle='How Many guest coming'
                    value={guestCount}
                    onChange={(value)=> setGuestCount(value)}
                />
                <Counter
                    title='Room'
                    subtitle='How Many room coming'
                    value={roomCount}
                    onChange={(value)=> setRoomtCount(value)}
                />
                <Counter
                    title='Bathroom'
                    subtitle='How Many bathroom coming'
                    value={bathroomCount}
                    onChange={(value)=> setBathroomCount(value)}
                />
           </div>  
        );
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATIONS? undefined: onBack}
            body={bodyContent}
        />
    );
}

export default SearchModal;