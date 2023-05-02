import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Association } from 'src/associations/entities/association.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class JoinRequest extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.joinRequests, {
    eager: true,
  })
  user?: User;

  @ManyToOne(() => Association, (assoc) => assoc.joinRequests, {
    eager: true,
  })
  association?: Association;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
