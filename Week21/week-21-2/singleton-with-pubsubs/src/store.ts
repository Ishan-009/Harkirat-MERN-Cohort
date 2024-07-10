import { createClient } from '@redis/client';
import { RedisClientType } from 'redis';
export class PubSubManager {
  private static instance: PubSubManager;
  private redisClient: RedisClientType;
  private subscriptions: Map<string, string[]>;
  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }

  public static getInstance(): PubSubManager {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }

    return PubSubManager.instance;
  }

  public userSubscribe(userId: string, stock: string) {
    if (!this.subscriptions.has(stock)) {
      this.subscriptions.set(stock, []);
    }

    this.subscriptions.get(stock)?.push(userId);
  }
  public userUnsubscribe(userId: string, stock: string) {}
  public handleMessage(stock: string, message: string) {}
  public disconnect() {}
}
