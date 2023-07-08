import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function Navbar() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['jwtToken', 'profile']);

    const [isLoggedIn, setIsloggedIn] = useState(false);

    useEffect(() => {
        setIsloggedIn(cookies?.jwtToken != undefined);
    }, [cookies]);

    function handleLogout() {
        removeCookie('jwtToken', { path: '/' });
        removeCookie('profile', { path: '/' });

        return router.push('/');
    }

    return (
        <nav className="navbar-expand-lg navbar-light bg-light navbar">
            <Link className="navbar-brand" style={{ width: '150px' }} href="/">
                <svg
                    version="1.0"
                    viewBox="0 0 240 75"
                    color-interpolation-filters="sRGB"
                    style={{ margin: 'auto' }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs></defs>
                    <g fill="#006747">
                        <g transform="matrix(1, 0, 0, 1, -45.319466, -79.866272)">
                            <path data-gra="graph-name-bg" fill="none" d="M54.22 86.082h231.56v63.68H54.22z"></path>
                            <g data-gra="path-name-bg" mask="url(#a)" transform="translate(54.22 86.082)">
                                <path data-gra="graph-name-bg" d="M0 0h113.02v63.68H0z"></path>
                                <path
                                    d="M22.7 56.08H5V7.48h17.58v3.54H9.62v18.24h10.56v3.36H9.62v20.04H22.7v3.42Zm8.04 0H26.3l10.26-48.6h4.8l10.32 48.6h-4.5l-2.4-13.02H33.2l-2.46 13.02Zm8.28-42.54-5.16 26.22h10.32l-5.16-26.22Zm28.86 43.14q-3.96 0-6.57-1.65-2.61-1.65-3.93-4.62-1.32-2.97-1.62-6.93l4.02-1.2q.3 3 1.08 5.43.78 2.43 2.46 3.84 1.68 1.41 4.62 1.41 3.24 0 5.04-1.68 1.8-1.68 1.8-5.34 0-3.24-1.59-5.58t-4.35-4.92l-8.58-8.22Q57.98 25 56.9 22.63q-1.08-2.37-1.08-5.19 0-5.04 3-7.74T66.8 7q2.58 0 4.65.66 2.07.66 3.54 2.13 1.47 1.47 2.31 3.81.84 2.34 1.14 5.7l-3.9 1.02q-.24-3.06-.99-5.25t-2.34-3.33q-1.59-1.14-4.41-1.14-3 0-4.92 1.56t-1.92 4.86q0 1.98.75 3.6t2.67 3.48l8.58 8.1q2.88 2.7 4.98 6 2.1 3.3 2.1 7.44 0 3.66-1.41 6.12t-3.93 3.69q-2.52 1.23-5.82 1.23Zm29.46-.6H92.9V39.94L81.92 7.48h4.44l8.76 27 8.4-27h4.5L97.34 39.94v16.14Z"
                                    data-gra="path-name"
                                ></path>
                            </g>
                            <g data-gra="path-name-1-bg">
                                <path
                                    data-gra="graph-name-bg"
                                    fill="none"
                                    d="M167.24 86.082h118.54v63.68H167.24z"
                                ></path>
                                <path
                                    data-gra="graph-name-bg"
                                    d="M172.24 86.082h108.54v2H172.24zm0 61.68h108.54v2H172.24z"
                                ></path>
                                <path
                                    d="M182.98 142.162h-10.74v-48.6h13.38q4.92 0 8.52 1.08 3.6 1.08 5.61 3.87 2.01 2.79 2.01 7.89 0 3-.48 5.34t-1.77 4.05q-1.29 1.71-3.69 2.85l6.66 23.52h-11.1l-5.34-21.78h-3.06v21.78Zm0-41.4v13.44h3q2.28 0 3.54-.81 1.26-.81 1.77-2.34.51-1.53.51-3.69 0-3.12-1.14-4.86-1.14-1.74-4.2-1.74h-3.48Zm33.06 41.4H205.9l9.18-48.6h12.24l9.06 48.6h-9.9l-1.62-10.26h-7.14l-1.68 10.26Zm5.22-35.64-2.58 18.96h5.16l-2.58-18.96Zm30.36 35.64h-10.74v-48.6h10.74v48.6Zm29.16 0h-21.9v-48.6h10.74v41.34h11.16v7.26Z"
                                    data-gra="path-name-1"
                                ></path>
                            </g>
                        </g>
                    </g>
                    <mask id="a">
                        <path data-gra="graph-name-bg" stroke-width="2" fill="#fff" d="M0 0h113.02v63.68H0z"></path>
                        <path
                            d="M22.7 56.08H5V7.48h17.58v3.54H9.62v18.24h10.56v3.36H9.62v20.04H22.7v3.42Zm8.04 0H26.3l10.26-48.6h4.8l10.32 48.6h-4.5l-2.4-13.02H33.2l-2.46 13.02Zm8.28-42.54-5.16 26.22h10.32l-5.16-26.22Zm28.86 43.14q-3.96 0-6.57-1.65-2.61-1.65-3.93-4.62-1.32-2.97-1.62-6.93l4.02-1.2q.3 3 1.08 5.43.78 2.43 2.46 3.84 1.68 1.41 4.62 1.41 3.24 0 5.04-1.68 1.8-1.68 1.8-5.34 0-3.24-1.59-5.58t-4.35-4.92l-8.58-8.22Q57.98 25 56.9 22.63q-1.08-2.37-1.08-5.19 0-5.04 3-7.74T66.8 7q2.58 0 4.65.66 2.07.66 3.54 2.13 1.47 1.47 2.31 3.81.84 2.34 1.14 5.7l-3.9 1.02q-.24-3.06-.99-5.25t-2.34-3.33q-1.59-1.14-4.41-1.14-3 0-4.92 1.56t-1.92 4.86q0 1.98.75 3.6t2.67 3.48l8.58 8.1q2.88 2.7 4.98 6 2.1 3.3 2.1 7.44 0 3.66-1.41 6.12t-3.93 3.69q-2.52 1.23-5.82 1.23Zm29.46-.6H92.9V39.94L81.92 7.48h4.44l8.76 27 8.4-27h4.5L97.34 39.94v16.14Z"
                            data-gra="path-name"
                        ></path>
                    </mask>
                </svg>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse">
                <div className="navbar-nav m-auto">
                    <Link className={clsx('nav-link')} href="/">
                        Home
                    </Link>
                    <Link className={clsx('nav-link')} href="/location">
                        Train Location
                    </Link>
                    <Link className={clsx('nav-link')} href="/posts">
                        Posts
                    </Link>
                    <Link className={clsx('nav-link')} href="/notices">
                        Notices
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link className={clsx('nav-link')} href="/profile">
                                Profile
                            </Link>
                            <Link className={clsx('nav-link')} href="#" onClick={() => handleLogout()}>
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className={clsx('nav-link')} href="/login">
                                Login
                            </Link>
                            <Link className={clsx('nav-link')} href="/registration">
                                Registration
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
