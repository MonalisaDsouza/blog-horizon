import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export const accessTokenApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const accessToken = await getAccessToken();
        res.status(200).json({ token: accessToken });
    } catch (error) {
        console.error('Error getting access token:', error);
        res.status(401).json({ error: 'Not authenticated' });
    }
};
