import { z } from 'zod';

export const UserProfileSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50, { message: 'Name cannot exceed 50 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(20, { message: 'Username cannot exceed 20 characters' })
        .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' }),
    profileImage: z.any().refine((file) => file instanceof FileList && file.length > 0, { message: 'Please select a profile image' }),
    websiteUrl: z.string().url({ message: 'Invalid URL' }),
    location: z.string().min(2, { message: 'Location must be at least 2 characters' }).max(50, { message: 'Location cannot exceed 50 characters' }),
    bio: z.string().min(2, { message: 'Bio must be at least 3 characters' }).max(200, { message: 'Bio cannot exceed 200 characters' }),
});

export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;
