'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

async function getSearch(jwtToken: string, from: string, to: string, date: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/booking/search?from=${from}&to=${to}&date=${date}`;

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

        throw new Error('failed to get train list');
    } catch (error) {
        throw error;
    }
}

async function getBookedList(jwtToken: string, trainId: string, trainClass: string, date: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/booking/booked-seats?trainId=${trainId}&trainClass=${trainClass}&date=${date}`;

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

        throw new Error('failed to get booked list');
    } catch (error) {
        throw error;
    }
}

async function bookedSeat(jwtToken: string, trainId: string, trainClass: string, date: string, seatId: number) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/booking/book-seat`;

    try {
        const res = await fetch(url, {
            cache: 'no-store',
            method: 'POST',
            body: JSON.stringify({
                trainId,
                trainClass,
                date,
                seatId,
            }),
            headers: {
                'content-type': 'application/json',
                'x-access-token': jwtToken,
            },
        });

        const response = await res.json();
        if (response?.status == 'success') {
            return response.output;
        }

        throw new Error('failed to book seat');
    } catch (error) {
        throw error;
    }
}

async function buySeat(jwtToken: string, date: string, seatIds) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/booking/buy`;

    try {
        const res = await fetch(url, {
            cache: 'no-store',
            method: 'POST',
            body: JSON.stringify({
                date,
                seatIds,
            }),
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

        throw new Error('failed to buy seat');
    } catch (error) {
        throw error;
    }
}

export default function Location() {
    const router = useRouter();
    const query = useSearchParams();

    const [search, setSearch] = useState(null);
    const [booked, setBooked] = useState([]);
    const [seats, setSeats] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [cookies, setCookie] = useCookies(['jwtToken', 'profile']);

    const from = query.get('from');
    const to = query.get('to');
    const date = query.get('date');
    const showDate = `${date.slice(-2)} ${new Date(date).toLocaleString('default', { month: 'long' })}, ${date.slice(
        0,
        4
    )}`;

    useEffect(() => {
        if (!cookies.jwtToken) {
            return router.push('/login');
        }

        getSearch(cookies.jwtToken, from, to, date).then((data) => {
            setSearch(data);
        });
    }, [cookies, from, to, date, router]);

    console.log({ selectedSeats });
    return (
        <div className="container-lg">
            <section className="container pt-4">
                <div className="row">
                    <div className="col">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="align-items-center d-flex justify-content-between">
                                    <div>
                                        <span>
                                            <b style={{ color: '#006747' }}>
                                                {from} - {to}
                                            </b>
                                        </span>
                                        <br />
                                        <span>{showDate}</span>
                                    </div>
                                    <div>
                                        <Link href="/" className="btn-primary btn-sm btn">
                                            Search again
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container pt-4">{!search && <div>loading...</div>}</section>

            <section className="container">
                {search?.map((train) => {
                    return (
                        <div className="card mb-4" key={train.name}>
                            <h5 className="card-header">
                                {train.name} ( {train.departure} - {train.arrival} )
                            </h5>
                            <div className="card-body">
                                <div className="row">
                                    {train.trainClass?.map((trainClass) => {
                                        return (
                                            <div
                                                className={clsx(
                                                    'card ml-2 mb-2',
                                                    selectedClass?.trainId == train.trainId &&
                                                        selectedClass?.className == trainClass.className &&
                                                        'border-2'
                                                )}
                                                style={{ borderColor: '#006747' }}
                                                key={trainClass.className}
                                            >
                                                <div className="card-body">
                                                    <span>{trainClass.className}</span>
                                                    <p className="color-primary">
                                                        <b>৳{trainClass.fare}</b>
                                                    </p>
                                                    <span>Total Seat</span>
                                                    <p className="color-primary">
                                                        <b>{trainClass.totalSeat}</b>
                                                    </p>
                                                    <button
                                                        className="btn-primary btn-sm btn"
                                                        onClick={() => {
                                                            setSeats(null);
                                                            setSelectedClass({
                                                                trainId: train.trainId,
                                                                className: trainClass.className,
                                                                date: date,
                                                            });

                                                            getBookedList(
                                                                cookies.jwtToken,
                                                                train.trainId,
                                                                trainClass.className,
                                                                date
                                                            ).then((bookedList) => {
                                                                bookedList = bookedList.map((x) => Number(x));
                                                                setSelectedSeats([]);
                                                                setBooked(bookedList);
                                                                setSeats(trainClass.seats);
                                                            });
                                                        }}
                                                    >
                                                        View Seats
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {seats && selectedClass?.trainId == train.trainId && (
                                    <>
                                        <div
                                            className="row seats justify-content-start ring-1"
                                            style={{ maxWidth: '320px' }}
                                        >
                                            {seats.map((seat) => {
                                                return (
                                                    <div key={seat.seatId}>
                                                        <button
                                                            disabled={booked.includes(seat.seatId)}
                                                            style={{ width: '90px' }}
                                                            className={clsx(
                                                                'btn m-1',

                                                                !booked.includes(seat.seatId) && 'btn-outline',
                                                                selectedSeats.includes(seat.seatId) && 'btn-primary'
                                                            )}
                                                            onClick={async () => {
                                                                if (selectedSeats.includes(seat.seatId)) {
                                                                    return;
                                                                }
                                                                try {
                                                                    await bookedSeat(
                                                                        cookies.jwtToken,
                                                                        selectedClass.trainId,
                                                                        selectedClass.className,
                                                                        date,
                                                                        seat.seatId
                                                                    );
                                                                    setSelectedSeats([...selectedSeats, seat.seatId]);
                                                                } catch (error) {
                                                                    setBooked([...booked, seat.seatId]);
                                                                }
                                                            }}
                                                        >
                                                            {seat.seatCode}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="row justify-items-center">
                                            <div className="mx-auto mt-3">
                                                <button
                                                    className={clsx('btn', selectedSeats.length >= 1 && 'btn-primary')}
                                                    disabled={selectedSeats.length == 0}
                                                    onClick={async () => {
                                                        try {
                                                            await buySeat(cookies.jwtToken, date, selectedSeats);
                                                            router.push('/profile');
                                                        } catch (error) {
                                                            alert(error.message);
                                                            return;
                                                        }
                                                    }}
                                                >
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>
            <section className="container pt-4"> {search?.length == 0 && <div>Not Available</div>}</section>
        </div>
    );
}
