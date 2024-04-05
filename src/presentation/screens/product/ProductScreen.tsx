import React, {useRef} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {useQueryClient} from '@tanstack/react-query';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../router/StackNavigator';
import {Product} from '../../../domain/entities/products';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {
  Gender,
  Size,
} from '../../../infrastructure/interfaces/teslo-products.response';
import {CustomIcon} from '../../components/ui/CustomIcon';
import {Formik} from 'formik';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface ProductScreenProps
  extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route}: ProductScreenProps) => {
  const queryClient = useQueryClient();

  const {productId} = route.params;

  const productIdRef = useRef(productId);

  const product = queryClient.getQueryData<Product>([
    'products',
    productIdRef.current,
  ]);

  const theme = useTheme();

  if (!product) {
    return <MainLayout title={'Ups..'} subtitle={'Product not found'} />;
  }

  return (
    <Formik initialValues={product} onSubmit={values => console.log(values)}>
      {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
        <MainLayout title={values.title} subtitle={`Price: $${values.price}`}>
          <ScrollView style={{flex: 1}}>
            <Layout style={{padding: 20}}>
              <FlatList
                data={values.images}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <FadeInImage
                    uri={item}
                    style={{width: 300, height: 300, marginHorizontal: 7}}
                  />
                )}
              />
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
              />

              <Input
                label={'Stock'}
                value={values.stock.toString()}
                style={{flex: 1}}
                onChangeText={handleChange('stock')}
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
              onPress={() => console.log('Save changes')}>
              Save changes
            </Button>

            <Layout style={{height: 80}} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
