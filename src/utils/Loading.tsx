"use client";
import React from 'react';
import { useSession } from 'next-auth/react';

const LoadingScreen = ({ children }: any) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <h1 className='font-bold text-lg flex justify-center items-center h-screen'>Loading...</h1>
    } else {
        return children
    }
}

export default LoadingScreen;