import {isAxiosError} from 'axios';
import {tesloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities/products';

export const updateCreateProduct = async (product: Partial<Product>) => {
  product.stock = Number(product.stock);
  product.price = Number(product.price);

  if (product.id) {
    return updateProduct(product);
  }

  throw new Error('Not implemented yet');
};

const updateProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...rest} = product;

  try {
    const checkedImages = prepareImages(images!);
    const {} = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });
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
