import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'consumer' })
export class Consumer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'consumerId' })
  id: number;

  @Column({ type: 'varchar', name: 'phone', unique: true })
  phone: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'createDate',
  })
  createDate: Date;

  @Column({
    type: 'boolean',
    name: 'ownerType',
    nullable: true,
    default: false,
  })
  ownerType: boolean;
}
