import { Countries } from "src/enums/countries.enum";
import { TypeAlcohol } from "src/enums/typeAlcohol.enum";
import { OrderItem } from "src/order-items/entities/order-item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'alcohol' })
export class Alcohol {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryGeneratedColumn('uuid')
  item_code: string;

  @Column({ type: 'varchar', length: 30, name: 'brand', nullable: false })
  brand: string;

  @Column({ type: 'enum', enum: Countries, name: 'countries', nullable: false })
  countries: string;

  @Column({ type: 'enum', enum: TypeAlcohol, name: 'type_alcohol', nullable: false })
  type_alcohol: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'volume', nullable: false })
  volume: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'durability', nullable: false })
  durability: number;

  @Column({ type: 'boolean', name: 'availability', nullable: false, default: true })
  availability: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cost', nullable: false })
  cost: number;

  @Column({ type: 'text', name: 'description', nullable: true })
  description?: string;

  @OneToMany(() => OrderItem, (orderItems) => orderItems.alcohol)
  orderItems: OrderItem[];
}
