import React from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getProductsByPage} from '../../../actions/products/get-products-by-page';
import {MainLayout} from '../../layouts/MainLayout';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {ProductList} from '../../components/products/ProductList';

export const HomeScreen = () => {
  // const {isLoading, data: products = []} = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60, // 1 hour
  //   queryFn: () => getProductsByPage(0),
  // });

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,
    queryFn: async ({pageParam}) => {
      return await getProductsByPage(pageParam);
    },
    getNextPageParam: allPages => allPages.length,
  });

  return (
    <MainLayout title="TesloShop - Products" subtitle="Administrative App">
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ProductList products={data?.pages.flat() ?? []} fetchNextPage={fetchNextPage} />
      )}
    </MainLayout>
  );
};
