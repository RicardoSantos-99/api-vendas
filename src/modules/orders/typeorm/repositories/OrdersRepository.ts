import Customer from '@modules/customers/typeorm/entities/Customer';
import Product from '@modules/products/typeorm/entities/Product';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IProduct {
	product_id: string;
	price: number;
	quantity: number;
}

interface IRequest {
	customer: Customer;
	products: IProduct[];
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
	public async findById(id: string): Promise<Order | undefined> {
		return this.findOne(id, {
			relations: ['order_products', 'customer'],
		});
	}

	public async createOrder({ customer, products }: IRequest): Promise<Order> {
		const order = this.create({
			customer,
			order_products: products,
		});

		await this.save(order);

		return order;
	}
}

export default OrdersRepository;