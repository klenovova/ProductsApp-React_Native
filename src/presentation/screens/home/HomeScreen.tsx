import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getProductsByPage} from '../../../actions/products/get-products-by-page';
import {MainLayout} from '../../layouts/MainLayout';

export const HomeScreen = () => {
  const {isLoading, data: products = []} = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProductsByPage(0),
  });

  return (
    <MainLayout title="TesloShop - Products" subtitle="Administrative App">
      <Text>HomeScreen</Text>
    </MainLayout>
  );
};
