'use client';

import NavBar from '@/components/home/NavBar';
import { Separator } from '@/components/ui/separator';
import '../globals.css';
import { Providers } from '../providers';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="flex h-screen w-screen flex-col">
                <Providers>
                    <NavBar />
                    <Separator className="mb-[100px] sm:mb-14" />
                    {/* <MainLayout>{children}</MainLayout> */}
                    {children}
                </Providers>
            </div>
        </>
    );
}
