import Settings from '@/features/user/components/settings/settings';
import React from 'react';

interface PageProps {
    params: Promise<{ settingsType: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const { settingsType } = await params;
    return (
        <>
            <Settings settingsType={settingsType || 'profile'} />
        </>
    );
};

export default Page;
