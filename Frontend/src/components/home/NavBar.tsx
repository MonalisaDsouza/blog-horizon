'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { profileMenuOptions } from '@/config/config';
import useScreenSize from '@/utils/hof/useScreenSize';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Bell, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverContent } from '../ui/popover';
import { Separator } from '../ui/separator';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import LeftNavigation from './LeftNavigation';
import { useUserStore } from '@/features/auth/auth.store';

const NavBar: React.FC = () => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => setHasMounted(true), []);

    const [open, setOpen] = useState<boolean>(false);
    const closeRef = useRef<HTMLButtonElement>(null);
    const { isMobile } = useScreenSize();
    const { isLoggedIn } = useUserStore();

    const closeSheet = () => {
        if (closeRef.current) {
            closeRef.current.click();
        }
    };

    if (!hasMounted) return null;

    return (
        <>
            <div className="bg-background fixed z-10 flex h-auto w-screen flex-col-reverse flex-wrap items-center justify-between border-b-[1px] border-gray-300 px-4 sm:h-14 sm:flex-row sm:px-20">
                <div className="flex w-full items-center justify-start sm:mb-0 sm:w-auto sm:space-x-4">
                    <Link href="/">
                        <p className="text-primary hidden text-xl font-bold text-nowrap hover:cursor-pointer sm:block">Blog Horizon</p>
                    </Link>
                    <div className="relative flex w-full items-center justify-start sm:w-full">
                        <Search size={22} strokeWidth={1.5} className="absolute top-1/2 left-2 -translate-y-1/2" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="placeholder:text-foreground w-full pl-10 focus-within:border-red-600 sm:w-2xl"
                            onKeyDown={(e) => console.log('Search...', e.key)}
                        />
                    </div>
                </div>
                <div className="mb-3 flex w-full justify-between space-x-4 sm:mb-0 sm:w-auto sm:space-x-6">
                    <div className="flex items-center space-x-2">
                        {isMobile && (
                            <>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Menu />
                                    </SheetTrigger>
                                    <SheetContent side="left">
                                        <SheetHeader>
                                            <SheetTitle>Blog Horizon</SheetTitle>
                                        </SheetHeader>
                                        <LeftNavigation closeSheet={closeSheet} />
                                        <SheetFooter>
                                            <SheetClose asChild ref={closeRef}>
                                                <button className="hidden" />
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </>
                        )}
                        <p className="block text-lg font-bold sm:hidden">Blog Horizon</p>
                    </div>
                    <div className="flex space-x-4 sm:space-x-6">
                        <Button
                            variant="default"
                            className="text-foreground text-md hover:bg-primary hover:text-foreground hover:border-background border-primary border-[1px] bg-transparent px-6 font-bold hover:cursor-pointer"
                        >
                            New Post
                        </Button>
                        {isLoggedIn && <Bell className="self-center text-2xl hover:cursor-pointer" size={26} />}
                        {isLoggedIn ? (
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Avatar className="self-center hover:cursor-pointer" onClick={() => setOpen(!open)}>
                                        <AvatarImage
                                            loading="lazy"
                                            src="https://avatars.githubusercontent.com/u/93400369?s=400&u=4e03d23a5a20c3b79155d1dc7682525532c24797&v=4"
                                            alt="@vishaljagamani"
                                        />
                                        {/* <AvatarFallback>VJ</AvatarFallback> */}
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="mr-3.5 flex w-52 p-2 sm:mr-20">
                                    <div className="group flex w-full flex-col">
                                        <p className="rounded-sm px-4 py-2 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-[#272729]">
                                            <Link href="/vishal_jagamani" onClick={() => setOpen(false)}>
                                                Vishal Jagamani
                                            </Link>
                                        </p>
                                        <Separator className="my-2" />
                                        {profileMenuOptions?.map((option) => {
                                            return (
                                                <Link href={option.link} key={option.id} onClick={() => setOpen(false)}>
                                                    <p className="rounded-sm px-4 py-2 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-[#272729]">
                                                        {option.title}
                                                    </p>
                                                </Link>
                                            );
                                        })}
                                        <Separator className="my-2" />
                                        <Link href="/auth/logout" onClick={() => setOpen(false)}>
                                            <p className="rounded-sm px-4 py-2 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-[#272729]">
                                                Logout
                                            </p>
                                        </Link>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <Link href="/auth/login">
                                <Button className="self-center hover:cursor-pointer">Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
