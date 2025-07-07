import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../api/user.api';
import { useAuthStore } from '../auth.store';

export const useUserById = (id: string) => {
    const accessToken = useAuthStore.getState().accessToken;
    console.log('accessToken', useAuthStore.getState().accessToken);
    return useQuery({ queryKey: ['userById', id], queryFn: () => getUserById(id), enabled: !!id && !!accessToken, staleTime: 1000 * 60 * 5 });
};
