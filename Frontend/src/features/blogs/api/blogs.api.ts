import axiosInstance from '@/lib/axios';
import { getBlogsResponse } from '../blogs.types';
import { useAuthStore } from '@/features/auth/auth.store';

export const getBlogs = async (): Promise<getBlogsResponse> => {
    const token = useAuthStore.getState().accessToken;
    const { data } = await axiosInstance.get<getBlogsResponse>('/blogs', { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
