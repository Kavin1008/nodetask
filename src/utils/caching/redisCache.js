import Redis from 'redis'
import logger from '../logging/logger.js';

const redisClient = Redis.createClient();
const DEFAULT_EXPIRATION = 3600;

redisClient.connect();
export async function cache(key, cb) {
    try {
        const data = await redisClient.get(key);

        if (data !== null) {
            console.log("Cache Hit:", key);
            return JSON.parse(data);
        }

        console.log("Cache Miss:", key);
        const freshData = await cb();

        await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
        return freshData;
    } catch (err) {
        console.error("Redis Cache Error:", err);
        throw err;
    }
}

export async function updateCache(key, cb){
    try{
        const data = await redisClient.get(key);

        const newValue = await cb()
        console.log(newValue.dataValues);
        
        if (data !== null) {
            await redisClient.flushAll()
        }

        return newValue;
    }
    catch(err)
    {
        logger.error("Redis cache error ", err)
        throw err;
    }
}