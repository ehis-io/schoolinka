import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true, enum: ['GOOGLE', 'TWITTER', 'FACEBOOK'] })
  auth_provider: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  user_photo: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  access_token?: string;
}
