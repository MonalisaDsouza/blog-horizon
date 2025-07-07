'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { lazy, Suspense } from 'react';

const MarkdownEditor = lazy(() => import('@/features/blogs/components/editor/MarkdownEditor'));

const Page: React.FC = () => {
    return (
        <>
            <Suspense fallback={<div>Loading editor...</div>}>
                <div className="flex h-screen w-screen flex-col space-y-4 p-4">
                    {/* Header Section */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/">
                                <p className="text-primary border-primary hidden rounded-md border p-2 text-xl font-bold sm:block">Blog Horizon</p>
                            </Link>
                            <p className="text-xl font-semibold">Create New Post</p>
                        </div>
                        {/* <ToolBar /> */}
                    </div>
                    <div className="flex-grow overflow-hidden">
                        <MarkdownEditor />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button variant="default" className="text-md bg-primary px-10 font-bold hover:cursor-pointer">
                            Save
                        </Button>
                        <Button
                            variant="outline"
                            className="text-foreground border-border text-md hover:bg-background hover:text-foreground hover:border-background border bg-transparent px-10 font-bold hover:cursor-pointer"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Suspense>
        </>
    );
};

export default Page;
