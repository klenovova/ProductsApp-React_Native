import {isAxiosError} from 'axios';
import {tesloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities/products';

export const updateCreateProduct = async (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== 'new') {
    return await updateProduct(product);
  }
  return await createProduct(product);
};

const prepareImages = async (images: string[]) => {
  const fileImages = images.filter(image => image.startsWith('file://'));

  const webImages = images.filter(image => !image.startsWith('file://'));

  if (fileImages.length > 0) {
    const uploadImagePromises = fileImages.map(uploadImage);

    const uploadedImages = await Promise.all(uploadImagePromises);

    webImages.push(...uploadedImages);
  }

  return webImages.map(image => image.split('/').pop()!);
};

const uploadImage = async (image: string) => {
  const formData = new FormData();

  formData.append('file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split('/').pop(),
  });

  const {data} = await tesloApi.post<{image: string}>(
    '/files/product',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data.image;
};

const updateProduct = async (product: Partial<Product>): Promise<Product> => {
  const {id, images = [], ...rest} = product;

  try {
    const checkedImages = await prepareImages(images!);
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

const createProduct = async (product: Partial<Product>): Promise<Product> => {
  const {images = [], ...rest} = product;

  try {
    const checkedImages = await prepareImages(images!);
    const {data} = await tesloApi.post('/products/', {
      images: checkedImages,
      ...rest,
    });

    console.log('Creating product', data);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    throw new Error(`Error creating product - ${error}`);
  }
};
