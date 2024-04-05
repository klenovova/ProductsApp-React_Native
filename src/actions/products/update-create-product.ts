import {isAxiosError} from 'axios';
import {tesloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities/products';

export const updateCreateProduct = async (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id) {
    return await updateProduct(product);
  }

  throw new Error('Not implemented yet');
};

const updateProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...rest} = product;

  try {
    const checkedImages = prepareImages(images!);
    const {data} = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    throw new Error(`Error updating product - ${error}`);
  }
};

const prepareImages = (images: string[]) => {
  return images.map(image => image.split('/').pop()!);
};
