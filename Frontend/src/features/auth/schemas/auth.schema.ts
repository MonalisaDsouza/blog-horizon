import { z } from 'zod';

export const SignupSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(20, { message: 'Username cannot exceed 20 characters' })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: 'Username can only contain letters, numbers, and underscores',
        }),
    dob: z.preprocess(
        (val) => {
            if (typeof val === 'string' || val instanceof Date) return new Date(val);
        },
        z.date({
            required_error: 'Date of birth is required',
            invalid_type_error: 'Expected a date',
        }),
    ),
    bio: z.optional(z.string().min(2, { message: 'Bio must be at least 3 characters' }).max(200, { message: 'Bio cannot exceed 200 characters' })),
    website: z.optional(z.string().url({ message: 'Invalid URL' })),
    location: z.optional(z.string().min(2, { message: 'Location must be at least 2 characters' })),
});

export type SignupType = z.infer<typeof SignupSchema>;
