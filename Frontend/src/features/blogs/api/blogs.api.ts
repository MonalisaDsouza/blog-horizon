import axiosInstance from '@/lib/axios';
import { getBlogsResponse } from '../blogs.types';

export const getBlogs = async (): Promise<getBlogsResponse> => {
    const { data } = await axiosInstance.get<getBlogsResponse>('/blogs');
    return data;
};
