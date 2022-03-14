import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProducts } from '@modules/orders/domain/models/ICreateOrderProducts';

export interface ICreateOrder {
	customer: ICustomer;
	products: ICreateOrderProducts[];
}
