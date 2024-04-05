import {tesloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities/products';
import {TesloProduct} from '../../infrastructure/interfaces/teslo-products.response';
import {ProductsMapper} from '../../infrastructure/mappers/products.mapper';

export const getProductsByPage = async (
  page: number,
  limit: number = 20,
): Promise<Product[]> => {
  try {
    const {data} = await tesloApi.get<TesloProduct[]>(
      `/products?offset=${page * 10}&limit=${limit}`,
    );

    const products = data.map(ProductsMapper.tesloProductToEntity);

    return products;
  } catch (error) {
    console.error('Error getting products by page', error);
    throw new Error('Error getting products by page');
  }
};
