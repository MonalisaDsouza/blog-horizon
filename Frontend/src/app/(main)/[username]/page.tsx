import UserProfile from '@/features/user/components/userProfile/UserProfile';
import React from 'react';

interface PageProps {
    params: Promise<{ username: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const { username } = await params;

    return (
        <>
            <UserProfile username={username} />
        </>
    );
};

export default Page;
