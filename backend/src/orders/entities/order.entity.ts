import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total_price: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;
}
