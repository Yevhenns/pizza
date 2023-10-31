import React, { FC, useEffect, useState } from 'react';
import Heading from '@/components/Heading/Heading';
import ChosenItem from '@/components/ChosenItem/ChosenItem';
import { Container } from '@/components/Container/Container';
import { Section } from '@/components/Section/Section';
import GoodsList from '@/components/GoodsList/GoodsList';
import Loader from '@/components/Loader/Loader';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getIsLoading, getPizzas } from '@/redux/products/productsSlice';
import { getProducts } from '@/redux/products/productsOperations';

const Pizzas: FC = () => {
  const [currentPizza, setCurrentPizza] = useState({} as TChosenGood);
  const [open, setOpen] = useState(false);
  const [pizzasAll, setPizzasAll] = useState<TChosenGood[]>([]);

  const pizzas = useAppSelector(getPizzas);
  const isLoading = useAppSelector(getIsLoading);
  const dispatch = useAppDispatch();

  const handleClose = () => setOpen(false);

  const getCurrentPizza = (_id: string) => {
    const chosenPizza = pizzasAll.find(item => item._id === _id);
    if (chosenPizza) {
      setCurrentPizza(chosenPizza);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (pizzasAll.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, pizzasAll]);

  useEffect(() => {
    setPizzasAll(pizzas);
  }, [pizzas]);

  return (
    <>
      <Head>
        <title>Pizza - pizzas</title>
      </Head>
      <Section>
        <Container>
          <Heading>Піци</Heading>
          <div style={{ height: '50px' }}>{isLoading && <Loader />}</div>
          <GoodsList data={pizzasAll} getCurrentItem={getCurrentPizza} />
          {/* {open && (
            <ChosenItem
              open={open}
              handleClose={handleClose}
              currentItem={currentPizza}
            />
          )} */}
          <ToastContainer />
        </Container>
      </Section>
    </>
  );
};
export default Pizzas;
