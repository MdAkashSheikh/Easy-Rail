import fastifyPlugin from 'fastify-plugin';

import Redis from 'ioredis';
const redisClient = new Redis({ host: process.env.REDIS_HOST });

const cache = {};

export const setCache = async (key, value, ttl, inMemoryCaching = false) => {
    const now = new Date().getTime();
    const cacheData = {
        response: value,
        time: now,
        ttl: ttl,
    };

    if (inMemoryCaching) {
        cache[key] = cacheData;
    } else {
        await redisClient.hset('response_caching', key, JSON.stringify(cacheData));
    }
};

export const getCache = async (key, inMemoryCaching = false) => {
    let response = null;
    const now = new Date().getTime();
    if (inMemoryCaching) {
        if (!cache[key] || now > cache[key].time + cache[key].ttl) {
            delete cache[key];
            return null;
        }
        response = cache[key].response;
    } else {
        let data = await redisClient.hget('response_caching', key);
        if (!data || now > data.time + data.ttl) {
            return null;
        }
        data = JSON.parse(data);
        response = data.response;
    }

    return response;
};

const cachablePlugin = (fastify, options, done) => {
    /* cachableContent will be available in fastify.cachableContent */
    fastify.decorate('cachableContent', cachableContent);

    async function cachableContent(func, args, cacheKey, cacheTTL, inMemoryCaching = false) {
        const promiseCacheTTL = 10 * 1000; /* 10 seconds */
        const promiseCacheKey = 'promise-' + cacheKey;

        /* get response from cache */
        let response = await getCache(cacheKey, inMemoryCaching);
        if (response) {
            return response;
        }

        /* in memory promise cache to prevent multiple call to func */
        let responsePromise = await getCache(promiseCacheKey, true);
        if (responsePromise) {
            /* wait for promise cache to resolve */
            response = await responsePromise;
            return response;
        }

        /* call the original function */
        responsePromise = func(...args);

        /* set response promise to in memory cache */
        await setCache(promiseCacheKey, responsePromise, promiseCacheTTL, true);
        /* wait for promise to resolve */
        response = await responsePromise;

        /* set response to cache */
        await setCache(cacheKey, response, cacheTTL, inMemoryCaching);

        return response;
    }

    done();
};

/**
 * with fastifyPlugin wrap, this plugin will modify outer scope of fastify server object
 */
export default fastifyPlugin(cachablePlugin, {
    fastify: '4.x',
    name: '@wstore-shopping/cachablePlugin',
});
