'use client';

import { Input } from '@/components/ui/input';
import React from 'react';

const BlogTitleDescription: React.FC = () => {
    return (
        <>
            <div className="flex flex-col">
                <Input
                    placeholder="Enter your title here..."
                    className="bg-background text-foreground h-full w-full resize-none rounded-none rounded-t-sm border-none p-4 font-mono text-3xl font-bold shadow-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
        </>
    );
};

export default BlogTitleDescription;
