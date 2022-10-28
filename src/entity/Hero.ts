import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ["warrior", "mage", "assasin", "priest", "paladin"],
    default: "guest",
  })
  type: string;
}
