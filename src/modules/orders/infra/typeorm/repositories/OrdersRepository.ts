import { getRepository, Repository } from 'typeorm';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';

class OrdersRepository implements IOrdersRepository {
	private ormRepository: Repository<Order>;
	constructor() {
		this.ormRepository = getRepository(Order);
	}

	public async findById(id: string): Promise<Order | undefined> {
		return this.ormRepository.findOne(id, {
			relations: ['order_products', 'customer'],
		});
	}

	public async createOrder({
		customer,
		products,
	}: ICreateOrder): Promise<Order> {
		const order = this.ormRepository.create({
			customer,
			order_products: products,
		});

		await this.ormRepository.save(order);

		return order;
	}
	public async create({ customer, products }: ICreateOrder): Promise<Order> {
		const order = this.ormRepository.create({
			customer,
			order_products: products,
		});

		await this.ormRepository.save(order);

		return order;
	}
}

export default OrdersRepository;
