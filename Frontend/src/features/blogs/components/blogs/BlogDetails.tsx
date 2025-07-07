'use client';

import React from 'react';

const BlogDetails: React.FC<{ blog: string }> = ({ blog }) => {
    return (
        <>
            <div>
                <p>Blog Details {blog}</p>
            </div>
        </>
    );
};

export default BlogDetails;
