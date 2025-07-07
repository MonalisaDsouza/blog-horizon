'use client';

import { useUser as useAuth0User } from '@auth0/nextjs-auth0';
import React, { useEffect } from 'react';
import { useUserById } from '../hooks/useUser';
import { useUserStore } from '../auth.store';

const UserInitializer: React.FC = () => {
    const { user: auth0User, isLoading: isLoadingAuth0 } = useAuth0User();
    const setUserDetails = useUserStore((state) => state.updateUserDetails);
    const setAuth0UserId = useUserStore((state) => state.setAuth0UserId);
    const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);
    const setIsUserInitialized = useUserStore((state) => state.setIsUserInitialized);

    const { data: userById, isSuccess } = useUserById(encodeURIComponent(auth0User?.sub ?? ''));

    useEffect(() => {
        if (!auth0User && !isLoadingAuth0) {
            setUserDetails(null);
            setIsUserInitialized(true);
        }
    }, [auth0User, isLoadingAuth0, setUserDetails, setIsUserInitialized]);

    useEffect(() => {
        if (isLoadingAuth0) return;
        setAuth0UserId(auth0User?.sub ?? '');
        setIsLoggedIn(!!auth0User);
    }, [isLoadingAuth0, setAuth0UserId, setIsLoggedIn, auth0User]);

    useEffect(() => {
        if (!auth0User) return;
        setUserDetails({
            ...auth0User,
            ...userById?.data,
            isSignupComplete: userById?.data?.isSignupComplete ?? false,
        });
        setIsUserInitialized(true);
    }, [auth0User, isSuccess, userById, setUserDetails, setIsUserInitialized]);
    return null;
};

export default UserInitializer;
