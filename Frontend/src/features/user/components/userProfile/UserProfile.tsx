'use client';

import React from 'react';

const UserProfile: React.FC<{ username: string }> = ({ username }) => {
    return (
        <>
            <div>
                <p>User Profile {username}</p>
            </div>
        </>
    );
};

export default UserProfile;
