import { DataSourceOptions  } from 'typeorm';
 
const config: DataSourceOptions  = {
  type: 'postgres',
  host: "127.0.0.1",
  port: 5433,
  username: "customstorydev",
  password: "customstorydev",
  database: "customstorydev",
  entities: [
    './entity/*{.ts,.js}',
  ],
  migrations: [
    './migration/*{.ts,.js}',
  ],
  subscribers: [
    './subscriber/*{.ts,.js}',
  ],
};
 
export = config;