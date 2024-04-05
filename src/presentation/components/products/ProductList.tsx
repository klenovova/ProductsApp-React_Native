import React, {useState} from 'react';
import {Product} from '../../../domain/entities/products';
import {Layout, List} from '@ui-kitten/components';
import {ProductCard} from './ProductCard';
import {RefreshControl} from 'react-native';

interface ProductListProps {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductList = ({products, fetchNextPage}: ProductListProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsRefreshing(false);
  };

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
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
