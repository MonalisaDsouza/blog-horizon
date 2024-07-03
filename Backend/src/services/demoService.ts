import axios, { AxiosRequestConfig } from 'axios';
import { config } from '../config/config.js';

export const getCatFact = async () => {
    try {
        const options: AxiosRequestConfig = {
            url: `${config?.url}/fact`,
            method: 'GET',
        };
        const response = await axios(options);
        return response?.data;
    } catch (err) {
        console.log('Error in demoService.getCatFact service', err);
        return { status: false, message: 'Error in service' };
    }
};
