import { Collection, Database } from '@nocobase/database';
import * as process from 'process';
import { AcquireLockOptions } from '../../rpc-broker/mutex-interface';
import { ConnectionInfo, RemoteServiceInfo, ServiceDiscoveryClient, ServiceType } from '../client';

import ServiceRegistryCollection from './service-registry-collection';

function customLogger(queryString, queryObject) {
  console.log(queryString); // outputs a string
  console.log(queryObject.bind); // outputs an array
}

export class DatabaseDiscoveryClient extends ServiceDiscoveryClient {
  db: Database;

  databaseOptions() {
    return {
      logging: process.env.DB_LOGGING == 'on' ? customLogger : false,
      dialect: process.env.DB_DIALECT as any,
      storage: process.env.DB_STORAGE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as any,
      timezone: process.env.DB_TIMEZONE,
      tablePrefix: process.env.DB_TABLE_PREFIX,
      schema: process.env.DB_SCHEMA,
      underscored: process.env.DB_UNDERSCORED === 'true',
    };
  }

  async getDb() {
    if (!this.db) {
      const db = new Database(this.databaseOptions());
      db.collection(ServiceRegistryCollection);

      await db.sync({
        force: false,
        alter: {
          drop: false,
        },
      });

      console.log(
        `database discovery client connected to ${process.env.DB_DIALECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
      );

      this.db = db;
    }

    return this.db;
  }

  async getRegistryCollection(): Promise<Collection> {
    const db = await this.getDb();
    return db.getCollection('service_registry');
  }

  acquireLock(options: AcquireLockOptions): Promise<string | null> {
    return Promise.resolve(undefined);
  }

  clientConnectionInfo(): Promise<ConnectionInfo> {
    return Promise.resolve(undefined);
  }

  getServicesByName(serverType: ServiceType, name: string): Promise<RemoteServiceInfo[]> {
    return Promise.resolve([]);
  }

  async listServicesByType(serverType: ServiceType): Promise<Map<string, RemoteServiceInfo[]>> {
    const keyPrefix = `nocobase:${serverType}:*`;
    const collection = await this.getRegistryCollection();
    const services = new Map<string, RemoteServiceInfo[]>();

    const rows = await collection.repository.find({
      filter: {
        'key.$startsWith': keyPrefix,
      },
    });

    for (const row of rows) {
      const [host, port] = row.value.split(':');
      const [_prefix, serverType, name, instanceId] = row.key.split(':');

      if (!services.has(name)) {
        services.set(name, []);
      }

      services.get(name).push({
        instanceId,
        type: serverType,
        name,
        host,
        port: parseInt(port),
      });
    }

    return services;
  }

  async registerService(serviceInfo: RemoteServiceInfo): Promise<boolean> {
    const key = this.serviceKey(serviceInfo);
    const serviceValue = this.serviceValue(serviceInfo);
    const collection = await this.getRegistryCollection();

    await collection.repository.updateOrCreate({
      filterKeys: ['key'],
      values: {
        key,
        value: serviceValue,
      },
    });

    return true;
  }

  releaseLock(lockName: string, identifier: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  unregisterService(serviceInfo: RemoteServiceInfo): Promise<boolean> {
    return Promise.resolve(false);
  }

  private serviceKey(serviceInfo: RemoteServiceInfo) {
    return `nocobase:${serviceInfo.type}:${serviceInfo.name}:${serviceInfo.instanceId}`;
  }

  private serviceValue(serviceInfo: RemoteServiceInfo) {
    return `${serviceInfo.host}:${serviceInfo.port}`;
  }

  async destroy() {
    console.log('destroy database discovery client');
    if (this.db) {
      await this.db.close();
    }
  }
}
