import { getBlogs } from '@/features/blogs/api/blogs.api';
import { useQuery } from '@tanstack/react-query';

export const useBlogs = () => {
    return useQuery({ queryKey: ['blogs'], queryFn: getBlogs, staleTime: 1000 * 60 * 5 });
};
