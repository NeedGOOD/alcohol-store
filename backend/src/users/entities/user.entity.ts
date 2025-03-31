import { Role } from "src/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30, name: 'first_name', nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 30, name: 'last_name', nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 50, name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password', nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, enumName: 'UserRole', default: 'User' })
  role: Role;
}
