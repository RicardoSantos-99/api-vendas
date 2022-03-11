import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '@modules/products/infra/typeorm/entities/Product';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

interface IRequest {
	name: string;
	price: number;
	quantity: number;
}

class CreateProductService {
	public async execute({
		name,
		price,
		quantity,
	}: IRequest): Promise<Product> {
		const productsRepository = getCustomRepository(ProductRepository);

		const productExists = await productsRepository.findByName(name);

		if (productExists)
			throw new AppError('There is already a product with this name');

		const product = productsRepository.create({
			name,
			price,
			quantity,
		});

		await redisCache.invalidate('api-vendas-PRODUCT_LIST');
		await productsRepository.save(product);

		return product;
	}
}

export default CreateProductService;
