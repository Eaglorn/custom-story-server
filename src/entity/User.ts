import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToOne,
  JoinColumn,
} from "typeorm";
import md5 from "md5";
import { Hero } from "./Hero";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;

  setPassword(pass: string) {
    this.password = md5(pass);
  }

  isPassword({ pass }: { pass: string }) {
    if (md5(pass) === this.password) {
      return true;
    }
  }

  @Column({
    type: "enum",
    enum: ["guest", "user", "vip", "moderator", "admin"],
    default: "guest",
  })
  type: string;

  @OneToOne(() => Hero)
  @JoinColumn()
  hero: Hero;
}
