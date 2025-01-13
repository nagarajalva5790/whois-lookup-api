const cache = new Map<string, { data: any; expiry: number }>();

export const getFromCache = (key: string): any | null => {
    const cached = cache.get(key);
    if (cached && cached.expiry > Date.now()) {
        return cached.data;
    }
    return null;
};

export const saveToCache = (key: string, data: any, ttl: number): void => {
    const expiry = Date.now() + ttl * 1000; // Convert TTL to milliseconds
    cache.set(key, { data, expiry });
};
