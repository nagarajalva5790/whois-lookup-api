import { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { getFromCache, saveToCache } from '../cache/cache';

export const lookupData = async (req: Request, res: Response): Promise<void> => {
    console.log('Request received at /api/lookup'); // Debugging

    const { query } = req.body;
    if (!query) {
        console.log('Missing query parameter'); // Debugging
        res.status(400).json({ error: 'Query parameter is required.' });
        return;
    }

    // Check cache first
    const cachedData = getFromCache(query);
    if (cachedData) {
        console.log('Data fetched from cache'); // Debugging
        res.json({ data: cachedData, source: 'cache' });
        return;
    }

    // WHOIS API request
    const apiUrl = 'https://whoisjson.com/api/v1/whois';
    const apiKey = 'Token=971785550c8169e12bb0b83e47a4bf01f4a652e7915b2d9b7fef1e1c43c06767';

    const options: AxiosRequestConfig = {
        method: 'GET',
        url: apiUrl,
        params: { domain: query },
        headers: {
            Authorization: apiKey,
        },
    };

    try {
        console.log(`Fetching data from WHOIS API: ${apiUrl} for domain ${query}`); // Debugging
        const response = await axios.request(options);

        // Cache the data for 5 minutes (300 seconds)
        saveToCache(query, response.data, 300);

        console.log('Data fetched from WHOIS API and cached'); // Debugging
        res.json({ data: response.data, source: 'api' });
    } catch (error: any) {
        console.error('Error fetching data from WHOIS API:', error.message); // Debugging
        res.status(500).json({ error: 'Failed to fetch data from WHOIS API.' });
    }
};
