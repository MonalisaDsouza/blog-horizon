'use client';

import { useUserStore } from '@/features/auth/auth.store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const AuthGuard: React.FC = () => {
    const router = useRouter();
    const pathName = usePathname();
    const isUserInitialized = useUserStore((state) => state.isUserInitialized);
    const user = useUserStore((state) => state.userDetails);

    useEffect(() => {
        if (!isUserInitialized) return;
        if (user === null) return;
        console.log('user', user);
        if (!user.isSignupComplete && pathName !== '/signup') {
            console.log('user is not signup complete');
            console.log('userDetails', useUserStore.getState().userDetails);
            // router.push('/signup');
        }
    }, [isUserInitialized, user, pathName, router]);

    return null;
};
