import React, { FC, useEffect } from 'react';
import Heading from '@/components/Heading/Heading';
import { Container } from '@/components/Container/Container';
import { Section } from '@/components/Section/Section';
import ProductsList from '@/components/productsList/ProductsList';
import Loader from '@/components/Loader/Loader';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAppetizers, getIsLoading } from '@/redux/products/productsSlice';
import { getProducts } from '@/redux/products/productsOperations';

const Appetizers: FC = () => {
  const appetizers = useAppSelector(getAppetizers);
  const isLoading = useAppSelector(getIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (appetizers.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, appetizers]);

  return (
    <>
      <Head>
        <title>Pizza - appetizers</title>
      </Head>
      <Section>
        <Container>
          <Heading>Закуски</Heading>
          <div style={{ height: '50px' }}>{isLoading && <Loader />}</div>
          <ProductsList data={appetizers} />
          <ToastContainer />
        </Container>
      </Section>
    </>
  );
};

export default Appetizers;
