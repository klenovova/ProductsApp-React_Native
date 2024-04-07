import React, {useRef} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  useTheme,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../router/StackNavigator';
import {Gender, type Product} from '../../../domain/entities/products';
import {ScrollView} from 'react-native-gesture-handler';

import {CustomIcon} from '../../components/ui/CustomIcon';
import {updateCreateProduct} from '../../../actions/products/update-create-product';
import {ProductSlideShow} from '../../components/products/ProductSlideShow';
import {genders, sizes} from '../../../config/constants/constants';
import {CameraAdapter} from '../../../config/adapters/camera-adapter';

interface ProductScreenProps
  extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route}: ProductScreenProps) => {
  const queryClient = useQueryClient();

  const {productId} = route.params;

  const productIdRef = useRef(productId);

  const product = queryClient.getQueryData<Product>([
    'product',
    productIdRef.current,
  ]);

  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess: (data: Product) => {
      productIdRef.current = data.id;
      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      });

      queryClient.invalidateQueries({
        queryKey: ['product', data.id],
      });
    },
  });

  const theme = useTheme();

  const emptyProduct: Product = {
    id: '',
    title: 'New Product',
    description: '',
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Unisex,
    sizes: [],
    stock: 0,
    tags: [],
  } as Product;

  return (
    <Formik initialValues={product ?? emptyProduct} onSubmit={mutation.mutate}>
      {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
        <MainLayout
          title={values.title}
          subtitle={`Price: $${values.price}`}
          rightAction={async () => {
            const photos = await CameraAdapter.takePicture();

            setFieldValue('images', [...values.images, ...photos]);
          }}
          rightActionIcon="camera-outline">
          <ScrollView style={{flex: 1}}>
            <Layout
              style={{
                padding: 20,
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ProductSlideShow images={values.images} />
            </Layout>

            <Layout style={{marginHorizontal: 10}}>
              <Input
                label={'Title'}
                style={{marginVertical: 5}}
                value={values.title}
                onChangeText={handleChange('title')}
              />

              <Input
                label={'Slug'}
                style={{marginVertical: 5}}
                value={values.slug}
                onChangeText={handleChange('slug')}
              />

              <Input
                label={'Description'}
                value={values.description}
                multiline
                numberOfLines={5}
                style={{marginVertical: 5}}
                onChangeText={handleChange('description')}
              />
            </Layout>

            <Layout
              style={{
                marginVertical: 5,
                marginHorizontal: 15,
                flexDirection: 'row',
                gap: 10,
              }}>
              <Input
                label={'Price'}
                value={values.price.toString()}
                style={{flex: 1}}
                onChangeText={handleChange('price')}
                keyboardType="numeric"
              />

              <Input
                label={'Stock'}
                value={values.stock.toString()}
                style={{flex: 1}}
                onChangeText={handleChange('stock')}
                keyboardType="numeric"
              />
            </Layout>

            <ButtonGroup
              style={{margin: 2, marginTop: 20, marginHorizontal: 15}}
              appearance="outline"
              size="small">
              {sizes.map(size => (
                <Button
                  key={size}
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? theme['color-primary-200']
                      : undefined,
                  }}>
                  {size}
                </Button>
              ))}
            </ButtonGroup>

            <ButtonGroup
              style={{margin: 2, marginTop: 20, marginHorizontal: 15}}
              appearance="outline"
              size="small">
              {genders.map(gender => (
                <Button
                  key={gender}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                  onPress={() => setFieldValue('gender', gender)}>
                  {gender}
                </Button>
              ))}
            </ButtonGroup>

            <Button
              style={{margin: 15}}
              accessoryLeft={<CustomIcon name="save-outline" isWhite />}
              disabled={mutation.isPending}
              onPress={() => handleSubmit()}>
              Save changes
            </Button>

            <Layout style={{height: 80}} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
