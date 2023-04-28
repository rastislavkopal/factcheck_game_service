import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
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

  @OneToOne(() => User, {
    eager: false,
  })
  user?: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
