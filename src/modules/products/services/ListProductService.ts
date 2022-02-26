import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
	public async execute(): Promise<Product[]> {
		const productsRepository = getCustomRepository(ProductRepository);

		const redisCache = new RedisCache();

		await redisCache.save('key', 'value');
		return await productsRepository.find();
	}
}

export default ListProductService;
