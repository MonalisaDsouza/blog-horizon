import Settings from '@/features/user/components/settings/settings';

export default async function Page({ params }: { params: Promise<{ settingsType: string }> }) {
    const { settingsType } = await params;
    return <Settings settingsType={settingsType || 'profile'} />;
}
