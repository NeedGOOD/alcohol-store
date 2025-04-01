import { Alcohol } from "src/alcohol/entities/alcohol.entity";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orderItems' })
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Alcohol, (alcohol) => alcohol.orderItems)
  alcohol: Alcohol;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @Column({ type: 'int', name: 'quantity', nullable: false, default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'price', nullable: false })
  price: number;
}
