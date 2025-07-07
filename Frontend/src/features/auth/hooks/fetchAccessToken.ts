import { useAuthStore } from '../auth.store';

export const fetchAccessToken = async () => {
    try {
        const res = await fetch('/auth/access-token');
        console.log('Access token call');
        if (!res.ok) {
            console.log('User not authenticated or token fetch failed');
        }
        const data: { token: string } = await res.json();
        if (data?.token) {
            useAuthStore.getState().setAccessToken(data.token);
        }
    } catch (err) {
        console.error('Error getting access token:', err);
    }
};
