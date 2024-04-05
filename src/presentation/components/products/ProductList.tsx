import React, {useState} from 'react';
import {RefreshControl} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';

import {Product} from '../../../domain/entities/products';
import {Layout, List} from '@ui-kitten/components';
import {ProductCard} from './ProductCard';

interface ProductListProps {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductList = ({products, fetchNextPage}: ProductListProps) => {
  const queryClient = useQueryClient();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);

    await new Promise(resolve => setTimeout(resolve, 1500));
    queryClient.invalidateQueries({
      queryKey: ['products', 'infinite'],
    });

    setIsRefreshing(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{height: 150}} />}
      onEndReached={() => {
        console.log('fetching next page');
        fetchNextPage();
      }}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
