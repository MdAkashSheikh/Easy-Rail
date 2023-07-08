'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCookies } from 'react-cookie';

async function loginWithPassword(username: string, password: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/users/login`;

    try {
        const res = await fetch(url, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const response = await res.json();
        if (response?.status == 'success') {
            return response;
        } else if (response?.message) {
            return alert(response?.message);
        }

        throw new Error('failed to login');
    } catch (error) {
        throw error;
    }
}

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [cookies, setCookie] = useCookies(['jwtToken', 'refreshToken', 'profile']);

    async function handleLogin(e) {
        e.preventDefault();

        if (!username || !password) return;
        const response = await loginWithPassword(username, password);
        if (response?.status != 'success') {
            return;
        }

        const maxAge = 24 * 60 * 60; /* 1 day */

        setCookie('jwtToken', response.output.jwtToken, { path: '/', maxAge });
        setCookie('profile', JSON.stringify(response.output.profile), { path: '/', maxAge });

        return router.push('/');
    }

    return (
        <div className="bg min-h-screen w-full">
            <div className="row justify-content-center align-items-center p-4 text-center">
                <div
                    className="col-sm-8 col-md-6 col-lg-4 m-1 mb-5 rounded p-3 shadow-sm"
                    style={{ backgroundColor: '#343a40df', color: 'white' }}
                >
                    <div className="pt-5 pb-5">
                        <h1 className="font-font-weight-bold text-4xl">Train Ticketing</h1>
                        <p className="text-uppercase m-3 text-center">Login</p>
                        <form className="form text-center" onSubmit={(e) => handleLogin(e)}>
                            <div className="form-group input-group-md">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your email/mobile"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group input-group-md">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn-primary btn mt-4 w-full text-white" type="submit">
                                Login
                            </button>
                        </form>
                    </div>
                    <Link href="/registration" className="d-block mt-2 text-center">
                        Create an account?
                    </Link>
                </div>
            </div>
        </div>
    );
}
