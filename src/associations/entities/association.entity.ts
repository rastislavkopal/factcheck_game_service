import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { JoinRequest } from 'src/join-request/entities/join-request.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class Association extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, unique: true })
  shortTitle: string;

  @Index()
  @Column({ type: String, nullable: true })
  title: string | null;

  @Column({ type: String, nullable: true })
  description: string | null;

  @OneToMany(() => User, (user) => user.association)
  users?: User;

  @OneToMany(() => JoinRequest, (joinReq) => joinReq.user, {
    eager: false,
  })
  joinRequests?: JoinRequest | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
