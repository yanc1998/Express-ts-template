
import {createClient} from 'redis'
import {Service} from "typedi";

@Service()
export class RedisService {
    private readonly redisClient

    constructor() {
        this.redisClient = this.redisConfig()
    }

    private async redisConfig() {

        const redis = createClient()
        await redis.connect()
        redis.on('connection', () => {
            console.log('connected to redis')
        })
        return redis
    }

    public getClient() {
        return this.redisClient
    }
}