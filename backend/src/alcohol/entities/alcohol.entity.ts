import { Countries } from "src/enums/countries.enum";
import { TypeAlcohol } from "src/enums/typeAlcohol.enum";
import { OrderItem } from "src/order-items/entities/order-item.entity";
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'alcohol' })
export class Alcohol {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid', name: 'item_code', nullable: false, unique: true })
  @Generated('uuid')
  item_code: string;

  @Column({ type: 'varchar', length: 30, name: 'brand', nullable: false })
  brand: string;

  @Column({ type: 'enum', enum: Countries, name: 'countries', nullable: false })
  countries: Countries;

  @Column({ type: 'enum', enum: TypeAlcohol, name: 'type_alcohol', nullable: false })
  type_alcohol: TypeAlcohol;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'volume', nullable: false })
  volume: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'durability', nullable: false })
  durability: number;

  @Column({ type: 'boolean', name: 'availability', nullable: false, default: true })
  availability: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cost', nullable: false })
  cost: number;

  @Column({ type: 'text', name: 'description', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 255, name: 'file', nullable: false })
  file: string;

  @OneToMany(() => OrderItem, (orderItems) => orderItems.alcohol, { onDelete: 'CASCADE' })
  orderItems: OrderItem[];
}
