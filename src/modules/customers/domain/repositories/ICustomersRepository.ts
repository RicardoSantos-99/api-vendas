import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';

export interface ICustomersRepository {
	findAll(): Promise<ICustomer[]>;
	findByName(name: string): Promise<ICustomer | undefined>;
	findById(id: string): Promise<ICustomer | undefined>;
	findByEmail(email: string): Promise<ICustomer | undefined>;
	create(data: ICreateCustomer): Promise<ICustomer>;
	save(customer: ICustomer): Promise<ICustomer>;
	remove(customer: ICustomer): Promise<void>;
}
