import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Hero } from "./entity/Hero";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5433,
  username: "customstorydev",
  password: "customstorydev",
  database: "customstorydev",
  synchronize: true,
  logging: false,
  entities: [User, Hero, "./entity/*{.ts,.js}"],
  migrations: ["./migration/*{.ts,.js}"],
  subscribers: ["./subscriber/*{.ts,.js}"],
});
