import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import OrdersProducts from './OrdersProducts';

@Entity('orders')
class Order implements IOrder {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => Customer)
	@JoinColumn({ name: 'customer_id' })
	customer: Customer;

	@OneToMany(() => OrdersProducts, order_products => order_products.order, {
		cascade: true,
	})
	order_products: OrdersProducts[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Order;
