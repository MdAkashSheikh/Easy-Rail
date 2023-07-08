'use client';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

import { usePathname } from 'next/navigation';

import { CookiesProvider } from 'react-cookie';

import ContainerLayout from '../component/containerLayout';
import Navbar from '../component/navbar';

export default function RootLayout({ children }) {
    let showMainContainer = true;
    const pathname = usePathname();

    if (pathname == '/login') {
        // showMainContainer = false;
    }

    return (
        <html lang="en">
            <head />
            <body>
                <CookiesProvider>
                    {showMainContainer ? (
                        <>
                            <Navbar></Navbar>
                            <ContainerLayout>{children}</ContainerLayout>
                        </>
                    ) : (
                        children
                    )}
                </CookiesProvider>
            </body>
        </html>
    );
}
