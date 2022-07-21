import { Provider } from '../../provider/entities/provider.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '../../group/entities/group.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @ManyToOne(() => Provider, (provider) => provider.games)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column({ type: 'varchar', length: 300, nullable: false })
  cover: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Group, (group) => group.games)
  @JoinColumn({ name: 'group_id' })
  group: Group;
}
