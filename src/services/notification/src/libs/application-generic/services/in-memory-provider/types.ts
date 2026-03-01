import { Cluster, Redis, ScanStream } from 'ioredis';
import type { ChainableCommander, ClusterOptions, RedisOptions } from 'ioredis';

export { Cluster, Redis, ScanStream };
export type { ClusterOptions, RedisOptions };

export type InMemoryProviderClient = Redis | Cluster | undefined;

export enum InMemoryProviderEnum {
  AZURE_CACHE_FOR_REDIS = 'AzureCacheForRedis',
  ELASTICACHE = 'Elasticache',
  MEMORY_DB = 'MemoryDB',
  REDIS = 'Redis',
  REDIS_CLUSTER = 'RedisCluster',
  REDIS_MASTER_SLAVE = 'RedisMasterSlave',
}

export type Pipeline = ChainableCommander;
