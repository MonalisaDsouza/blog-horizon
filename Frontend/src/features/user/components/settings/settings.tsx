'use client';

import { notFound } from 'next/navigation';
import React from 'react';

import AccountSettings from './AccountSettings';
import CustomizationSettings from './CustomizationSettings';
import NotificationSettings from './NotificationSettings';
import OrganizationSettings from './OrganizationSettings';
import ProfileSettings from './ProfileSettings';

const componentMap: Record<string, React.FC> = {
    profile: ProfileSettings,
    customization: CustomizationSettings,
    notifications: NotificationSettings,
    account: AccountSettings,
    organization: OrganizationSettings,
};

const Settings: React.FC<{ settingsType: string }> = ({ settingsType }) => {
    const Component = componentMap[settingsType];
    if (!Component) {
        return notFound();
    }
    return (
        <>
            <div className="mt-6 flex w-[80%] flex-col">
                <Component />
            </div>
        </>
    );
};

export default Settings;
