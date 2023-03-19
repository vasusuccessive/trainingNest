import { config } from 'dotenv';
import { IConfig } from './IConfig';

config();

export const configurations: IConfig = Object.freeze({
  env: process.env.NODE_ENV || 'local',
  mongo: process.env.MONGO_URL || 'mongodb://localhost:27017/nestPractice',
  port: process.env.PORT || 3001,
}) as IConfig;

export default configurations;
