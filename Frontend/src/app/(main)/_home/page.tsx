'use client';

import React, { useEffect } from 'react';

import BlogCard from '@/components/home/BlogCard';
import LeftNavigation from '@/components/home/LeftNavigation';
import { fetchAccessToken } from '@/features/auth/hooks/fetchAccessToken';
import { useBlogs } from '@/features/blogs/hooks/useBlogs';
import useScreenSize from '@/utils/hof/useScreenSize';

const Page: React.FC = () => {
    const { isMobile } = useScreenSize();
    const { data, isLoading, error } = useBlogs();

    useEffect(() => {
        fetchAccessToken();
    }, []);

    return (
        <>
            <div className="relative flex w-screen justify-center px-4 md:px-20">
                {!isMobile && (
                    <div className="fixed left-20 h-screen w-60 border-r py-6">
                        <LeftNavigation />
                    </div>
                )}
                <div className="w-full md:w-[80%]">
                    <div className="flex w-full justify-center">
                        <div className="w-full py-6 md:w-[80%] md:px-6">
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p className="text-red-500">Error: {error.message}</p>
                            ) : (
                                <div className="flex flex-col space-y-4">
                                    {data?.data?.content?.map((item) => (
                                        <BlogCard key={item.id} blog={item} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {!isMobile && (
                    <div className="fixed right-20 h-screen w-60 border-l py-6">
                        <p>Right Nav</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Page;
