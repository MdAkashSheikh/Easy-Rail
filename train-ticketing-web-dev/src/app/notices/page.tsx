'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { AvatarGenerator } from 'random-avatar-generator';
import ReactTimeAgo from 'react-time-ago';

import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
const generator = new AvatarGenerator();

async function getNotices() {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/notices`;

    try {
        const res = await fetch(url, {
            cache: 'no-store',
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });

        const response = await res.json();
        if (response?.status == 'success') {
            return response.output;
        } else if (response?.message) {
            return alert(response?.message);
        }

        throw new Error('failed to get notices');
    } catch (error) {
        throw error;
    }
}

export default function Notices() {
    const router = useRouter();

    const [notices, setNotices] = useState(null);
    const [refreshToggle, setRefreshToggle] = useState(false);
    const [body, setBody] = useState('');

    const [cookies, setCookie] = useCookies(['jwtToken', 'profile']);

    useEffect(() => {
        getNotices().then((data) => {
            setNotices(data);
        });
    }, [cookies, router, refreshToggle]);

    return (
        <div className="container-lg">
            <section className="container pt-4">{!notices && <div>loading...</div>}</section>

            <section className="container-lg pt-4">
                <div className="card mb-4">
                    <h5 className="card-header">Notices</h5>
                    <div className="card-body">
                        {notices?.map((notice) => {
                            return (
                                <div className="row notices" key={notice.noticeId}>
                                    <div className="col-md-4 m-auto">
                                        <div className="card mb-2 p-3 shadow ring-1">
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex align-items-center flex-row gap-1">
                                                    <div className="ms-2 c-details">
                                                        <h1 style={{ fontSize: 'x-large' }} className="mb-0">
                                                            {notice.title}
                                                        </h1>{' '}
                                                        <span>
                                                            <ReactTimeAgo date={notice.createdAt} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <h3 style={{ fontSize: 'large' }}>{notice.message}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="container pt-4"> {notices?.length == 0 && <div>No Notices</div>}</section>
        </div>
    );
}
