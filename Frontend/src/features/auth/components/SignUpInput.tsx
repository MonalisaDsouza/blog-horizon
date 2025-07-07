'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React from 'react';
import { SignUpInputProps } from '../auth.types';

const SignUpInput: React.FC<SignUpInputProps> = ({ name, label, error, icon: Icon, ...rest }) => {
    return (
        <>
            <div className="relative flex flex-col gap-1">
                <label htmlFor={name} className="text-sm font-semibold">
                    {label}
                </label>
                <div className="relative">
                    {Icon && (
                        <Icon
                            size={18}
                            strokeWidth={2}
                            className={cn('text-foreground absolute top-1/2 left-2 -translate-y-1/2', error && 'text-red-500')}
                        />
                    )}
                    <Input
                        id={name}
                        name={name}
                        className={cn(
                            'bg-background ring-foreground placeholder:text-muted-foreground text-sm',
                            Icon && 'pl-8',
                            error && 'border-red-500 ring-[0.5px] ring-red-500 focus-visible:ring-red-500',
                            rest.className,
                        )}
                        {...rest}
                    />
                </div>
                {error && <span className="absolute mt-16 text-xs text-red-500">{error}</span>}
            </div>
        </>
    );
};

export default SignUpInput;
