'use client';

import { Blog } from '@/features/blogs/blogs.types';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Bookmark, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likesCount, setLikesCount] = useState(blog.likesCount || 0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [commentsCount, setCommentsCount] = useState(blog.commentsCount || 0);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    };

    return (
        <>
            <div className="bg-background flex w-full flex-col space-y-6 rounded-md p-4">
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>{blog.authorName || 'Vishal Jagamani'}</p>
                </div>
                <Link className="flex flex-col space-y-2 hover:cursor-pointer" href={`/vishaljagamani/${blog.id}`}>
                    <p className="text-2xl">{blog.title}</p>
                    <p className="text-wrap">{blog.content}</p>
                </Link>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 select-none">
                            <div className="flex h-6 w-6 items-center justify-center">
                                <Heart
                                    size={18}
                                    className={`transition-colors duration-200 hover:cursor-pointer ${isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-foreground fill-none'}`}
                                    onClick={handleLike}
                                />
                            </div>
                            <p>{likesCount}</p>
                        </div>
                        <div className="flex items-center space-x-2 select-none">
                            <MessageCircle size={18} className="hover:cursor-pointer" />
                            <p>{commentsCount}</p>
                        </div>
                    </div>
                    <div>
                        <Bookmark
                            size={20}
                            className={`transition-colors duration-200 hover:cursor-pointer ${isBookmarked ? 'fill-foreground stroke-foreground' : 'stroke-foreground fill-none'}`}
                            onClick={() => setIsBookmarked(!isBookmarked)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogCard;
