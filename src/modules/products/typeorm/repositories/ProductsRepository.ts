import { EntityRepository, Repository, In } from 'typeorm';
import Product from '@modules/products/typeorm/entities/Product';

interface IFindProducts {
	id: string;
}
@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
	public async findByName(name: string): Promise<Product | undefined> {
		return this.findOne({ where: { name } });
	}

	public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
		const productsIds = products.map(product => product.id);

		return await this.find({
			where: {
				id: In(productsIds),
			},
		});
	}
}

export default ProductRepository;
