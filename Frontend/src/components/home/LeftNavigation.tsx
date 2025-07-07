'use client';

import { leftNavigationOptions } from '@/config/data.config';
import Link from 'next/link';
import React from 'react';
import SearchInput from './SearchInput';
import useScreenSize from '@/utils/hof/useScreenSize';

interface LeftNavigationProps {
    closeSheet?: () => void;
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({ closeSheet }) => {
    const { isMobile } = useScreenSize();

    return (
        <>
            <div className="flex w-full flex-col space-y-4 px-4">
                {isMobile && <SearchInput />}
                <div className="flex flex-col space-y-2">
                    {leftNavigationOptions?.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item?.id} href={item.link} onClick={closeSheet}>
                                <div className="flex w-full items-center space-x-2 py-2">
                                    {Icon && <Icon className="text-foreground h-5 w-5" strokeWidth={1.2} />}
                                    <p>{item.title}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default LeftNavigation;
