import React from 'react';
import {Product} from '../../../domain/entities/products';
import {Layout, List, Text} from '@ui-kitten/components';
import {ProductCard} from './ProductCard';

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({products}: ProductListProps) => {
  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => (
        <ProductCard
          product={item}
          //   onPress={() => {
          //     console.log('Product pressed:', item);
          //   }}
        />
      )}
      ListFooterComponent={() => <Layout style={{height: 150}} />}
    />
  );
};
