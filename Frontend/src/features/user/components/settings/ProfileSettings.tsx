'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserProfileSchema, UserProfileSchemaType } from '../../schemas/settings.schema';

const ProfileSettings: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserProfileSchemaType>({ resolver: zodResolver(UserProfileSchema), mode: 'onChange' });

    const handleUserSettingsOnSubmit = (data: UserProfileSchemaType) => {
        console.log(data);
    };

    return (
        <>
            <div className="flex w-full flex-col space-y-8">
                <form onSubmit={handleSubmit(handleUserSettingsOnSubmit)}>
                    <div className="bg-background flex w-full flex-col space-y-6 rounded-md p-4">
                        <p className="text-2xl font-semibold">User</p>
                        <div className="space-y-1">
                            <p className="text-lg font-semibold">Name</p>
                            <Input placeholder="Name" {...register('name')} />
                            {errors.name && <span className="absolute">{errors.name.message}</span>}
                        </div>
                        <div className="space-y-1">
                            <p className="text-lg font-semibold">Email</p>
                            <Input placeholder="Email" {...register('email')} />
                            {errors.email && <span className="absolute">{errors.email.message}</span>}
                        </div>
                        <div className="space-y-1">
                            <p className="text-lg font-semibold">Username</p>
                            <Input placeholder="Username" {...register('username')} />
                            {errors.username && <span className="absolute">{errors.username.message}</span>}
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="picture" className="text-lg font-semibold">
                                Profile Image
                            </label>
                            <Input id="picture" type="file" {...register('profileImage')} />
                        </div>
                    </div>
                    <div className="bg-background mt-6 flex w-full flex-col space-y-6 rounded-md p-4">
                        <p className="text-2xl font-semibold">Basic</p>
                        <div className="space-y-1">
                            <p className="text-lg font-semibold">Website URL</p>
                            <Input placeholder="Website URL" {...register('websiteUrl')} />
                            {errors.websiteUrl && <span>{errors.websiteUrl.message}</span>}
                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </>
    );
};

export default ProfileSettings;
