import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @Column('int')
  order_id: number;

  @Column('int')
  status: number;

  @Column('int')
  price_total: number;
}
