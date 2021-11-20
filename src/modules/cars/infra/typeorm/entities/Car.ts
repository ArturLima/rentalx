import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Category } from "./Category";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: String;

  @Column()
  name: String;

  @Column()
  description: String;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: String;

  @Column()
  fine_amount: number;

  @Column()
  brand: String;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: String;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
    }
  }
}
export { Car };
