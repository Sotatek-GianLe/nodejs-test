/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 4307,
  username: 'root',
  password: 'root',
  database: 'payment',
  entities: ['dist/**/*.entity.js'],
  logging: true,
  synchronize: false,
  migrationsRun: true,
  migrations: ['dist/**/migrations/*.js'],
  migrationsTableName: 'migrations_history',
});
