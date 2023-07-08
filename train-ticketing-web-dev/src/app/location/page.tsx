'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import dynamic from 'next/dynamic';

const TrainLocation = dynamic(() => import('./../../component/TrainLocation'), { ssr: false });

async function getTrainLocation(jwtToken: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/location`;

    try {
        const res = await fetch(url, {
            cache: 'no-store',
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'x-access-token': jwtToken,
            },
        });

        const response = await res.json();
        if (response?.status == 'success') {
            return response.output;
        } else if (response?.message) {
            return alert(response?.message);
        }

        throw new Error('failed to get train location');
    } catch (error) {
        throw error;
    }
}

export default function Location() {
    const router = useRouter();
    const [location, setLocation] = useState(null);

    const [cookies, setCookie] = useCookies(['jwtToken', 'profile']);

    useEffect(() => {
        if (!cookies.jwtToken) {
            return router.push('/login');
        }

        getTrainLocation(cookies.jwtToken).then((data) => {
            setLocation(data);
        });
    }, [cookies, router]);

    if (!location) {
        return <div>loading...</div>;
    }

    return <TrainLocation location={location}></TrainLocation>;
}
