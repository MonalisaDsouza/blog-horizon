import axiosInstance from '@/lib/axios';
import { getUserByIdResponse } from '../auth.types';
import { useAuthStore } from '../auth.store';

export const getUserById = async (id: string): Promise<getUserByIdResponse> => {
    const token = useAuthStore.getState().accessToken;
    const { data } = await axiosInstance.get<getUserByIdResponse>(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
