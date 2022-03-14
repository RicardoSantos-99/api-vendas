import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrder } from '@modules/orders/domain/models/IOrder';

export interface IOrdersRepository {
	findById(id: string): Promise<IOrder | undefined>;
	create(data: ICreateOrder): Promise<IOrder>;
}
