import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./logger/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "customstorydev",
  password: "customstorydev",
  database: "customstorydev",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});