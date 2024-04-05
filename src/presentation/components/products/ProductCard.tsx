import React from 'react';
import {Product} from '../../../domain/entities/products';
import {Card, Text} from '@ui-kitten/components/ui';
import {Image} from 'react-native';
import {FadeInImage} from '../ui/FadeInImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
  return (
    <Card style={{flex: 1, backgroundColor: '#F9F9F9', margin: 3}}>
      {product.images.length > 0 ? (
        <FadeInImage
          uri={product.images[0]}
          style={{width: '100%', height: 200}}
        />
      ) : (
        <Image
          source={require('../../../assets/no-product-image.png')}
          style={{width: '100%', height: 200}}
        />
      )}

      <Text numberOfLines={2} style={{textAlign: 'center'}}>
        {product.title}
      </Text>
    </Card>
  );
};
