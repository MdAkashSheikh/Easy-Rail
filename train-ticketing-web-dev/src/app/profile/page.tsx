'use client';

import moment from 'moment';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const TrainLocation = dynamic(() => import('./../../component/TrainLocation'), { ssr: false });

async function getProfile(jwtToken: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/users/profile`;

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

        throw new Error('failed to get profile');
    } catch (error) {
        throw error;
    }
}

async function getHistory(jwtToken: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/booking/history`;

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

        throw new Error('failed to get history');
    } catch (error) {
        throw error;
    }
}

export default function Profile() {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [history, setHistory] = useState(null);

    const [cookies, setCookie] = useCookies(['jwtToken', 'profile']);

    useEffect(() => {
        if (!cookies.jwtToken) {
            return router.push('/login');
        }

        getProfile(cookies.jwtToken).then((data) => {
            setProfile(data);
        });
        getHistory(cookies.jwtToken).then((data) => {
            setHistory(data);
        });
    }, [cookies, router]);

    if (!profile || !history) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <section className="container-lg pt-4">
                <div className="card mb-4">
                    <h5 className="card-header">User Profile</h5>
                    <div className="card-body">
                        <span>Name</span>
                        <p>
                            <b>{profile.full_name}</b>
                        </p>

                        <span>Email</span>
                        <p>
                            <b>{profile.email}</b>
                        </p>

                        <span>Mobile</span>
                        <p>
                            <b>{profile.mobile}</b>
                        </p>

                        <span>Address</span>
                        <p>
                            <b>{profile.address}</b>
                        </p>
                    </div>
                </div>
            </section>

            <section className="h-100 container-lg">
                <div className="card mb-4">
                    <h5 className="card-header">Purchase History</h5>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>journeyDate</th>
                                    <th>from</th>
                                    <th>to</th>
                                    <th>fare</th>
                                    <th>seat</th>
                                    <th>status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history &&
                                    history.map((item, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td>{item.journeyDate}</td>
                                                <td>{item.from}</td>
                                                <td>{item.to}</td>
                                                <td>{item.fare}</td>
                                                <td>{item.seatCode}</td>
                                                <td>{item.status}</td>
                                                <td className="flex gap-1">
                                                    {item.status == 'PAID' &&
                                                        moment(item.journeyDate).startOf('day') >
                                                            moment().startOf('day') && (
                                                            <button
                                                                className="btn-outline btn-error btn"
                                                                onClick={() =>
                                                                    confirm(
                                                                        'are you sure? you want to refund your ticket.'
                                                                    )
                                                                }
                                                            >
                                                                refund
                                                            </button>
                                                        )}
                                                    {item.status == 'PAID' && (
                                                        <button className="btn-primary btn" onClick={() => {}}>
                                                            download
                                                        </button>
                                                    )}

                                                    {item.status == 'PAYMENT_PENDING' && (
                                                        <>
                                                            <button
                                                                className="btn-outline btn-error btn"
                                                                onClick={() =>
                                                                    confirm(
                                                                        'are you sure? you want to cancel your ticket.'
                                                                    )
                                                                }
                                                            >
                                                                cancel
                                                            </button>

                                                            <button
                                                                className="btn-outline btn-error btn"
                                                                onClick={() => {}}
                                                            >
                                                                pay
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
