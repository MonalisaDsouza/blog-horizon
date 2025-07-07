import BlogDetails from '@/features/blogs/components/blogs/BlogDetails';
import React from 'react';

interface PageProps {
    params: Promise<{ blog: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const { blog } = await params;

    return (
        <>
            <BlogDetails blog={blog} />
        </>
    );
};

export default Page;
