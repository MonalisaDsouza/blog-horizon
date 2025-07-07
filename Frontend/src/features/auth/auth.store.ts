import { create } from 'zustand';

import { AuthStoreType, UserStoreType } from './auth.types';

export const useAuthStore = create<AuthStoreType>((set) => ({
    accessToken: null,
    setAccessToken: (accessToken: string | null) => set({ accessToken }),
}));

export const useUserStore = create<UserStoreType>((set, get) => ({
    auth0UserId: '',
    setAuth0UserId: (auth0UserId) => set({ auth0UserId }),
    userDetails: null,
    updateUserDetails: (userDetails) => set({ userDetails }),
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    getIsLoggedIn: () => !!get().userDetails,
    isUserInitialized: false,
    setIsUserInitialized: (val) => set({ isUserInitialized: val }),
}));
