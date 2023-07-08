'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCookies } from 'react-cookie';

async function registration(
    fullname: string,
    email: string,
    mobile: string,
    cmobile: string,
    password: string,
    cpassword: string,
    address: string
) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_API_VERSION}/users/registration`;

    try {
        const res = await fetch(url, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                full_name: fullname,
                email,
                mobile,
                cmobile,
                password,
                cpassword,
                address,
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

export default function Registration() {
    const router = useRouter();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [cmobile, setCMobile] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [address, setAddress] = useState('');

    const [cookies, setCookie] = useCookies(['jwtToken', 'refreshToken', 'profile']);

    async function handleRegistration(e) {
        e.preventDefault();
        const response = await registration(fullname, email, mobile, cmobile, password, cpassword, address);
        if (response?.status != 'success') {
            return false;
        }

        const maxAge = 24 * 60 * 60; /* 1 day */

        setCookie('jwtToken', response.output.jwtToken, { path: '/', maxAge });
        setCookie('profile', JSON.stringify(response.output.profile), { path: '/', maxAge });

        router.push('/');
    }

    return (
        <div className="bg min-h-screen w-full">
            <div className="row justify-content-center align-items-center p-4 text-center">
                <div
                    className="col-sm-12 col-md-12 col-lg-8  m-1 mb-5 rounded p-3 shadow-sm"
                    style={{ backgroundColor: '#343a40df', color: 'white' }}
                >
                    <div className="pt-5 pb-5">
                        <h1 className="font-font-weight-bold text-4xl">Train Ticketing</h1>
                        <p className="text-uppercase m-3 text-center">Registration</p>
                        <form className="form text-center" onSubmit={(e) => handleRegistration(e)}>
                            <div className="form-row">
                                <div className="form-group col-lg-6 input-group-md">
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        name="full_name"
                                        placeholder="Full Name"
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-lg-6 input-group-md">
                                    <input
                                        required
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-lg-6 input-group-md">
                                    <input
                                        required
                                        type="number"
                                        className="form-control"
                                        name="mobile"
                                        placeholder="Mobile"
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-lg-6 input-group-md">
                                    <input
                                        required
                                        type="number"
                                        className="form-control"
                                        name="cmobile"
                                        placeholder="Confirm Mobile"
                                        onChange={(e) => setCMobile(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-lg-6 input-group-md">
                                    <input
                                        required
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-lg-6 input-group-md">
                                    <input
                                        required
                                        type="password"
                                        className="form-control"
                                        name="cpassword"
                                        placeholder="Confirm Password"
                                        onChange={(e) => setCPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group input-group-md">
                                <textarea
                                    required
                                    className="form-control"
                                    name="address"
                                    placeholder="Address"
                                    onChange={(e) => setAddress(e.target.value)}
                                ></textarea>
                            </div>
                            <button className="btn-primary btn mt-4 w-full text-white">Registration</button>
                        </form>
                    </div>
                    <Link href="/login" className="d-block mt-2 text-center">
                        Already have an account?
                    </Link>
                </div>
            </div>
        </div>
    );
}
