import { EntityRepository, Repository } from 'typeorm';
import Product from '@modules/products/typeorm/entities/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
	public async findByName(name: string): Promise<Product | undefined> {
		return this.findOne({ where: { name } });
	}
}

export default ProductRepository;
