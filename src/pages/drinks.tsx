import React, { useEffect, useState } from 'react';
import Heading from '@/components/Heading/Heading';
import ChosenItem from '@/components/ChosenItem/ChosenItem';
import { Container } from '@/components/Container/Container';
import { Section } from '@/components/Section/Section';
import GoodsList from '@/components/GoodsList/GoodsList';
import Loader from '@/components/Loader/Loader';
import { getItems } from '@/api/getItems';
import Head from 'next/head';

const Drinks: React.FC = () => {
  const [currentDrink, setCurrentDrink] = useState({} as TChosenGood);
  const [open, setOpen] = useState(false);
  const [drinksAll, setDrinksAll] = useState<TChosenGood[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const getCurrentDrink = (_id: string) => {
    const chosenDrink = drinksAll.find(item => item._id === _id);
    if (chosenDrink) {
      setCurrentDrink(chosenDrink);
      setOpen(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getItems('drinks')
      .then(data => setDrinksAll(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Pizza - drinks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container>
          <Heading>Напої</Heading>
          {isLoading && <Loader />}
          <GoodsList data={drinksAll} getCurrentItem={getCurrentDrink} />
          {open && (
            <ChosenItem
              open={open}
              handleClose={handleClose}
              currentItem={currentDrink}
            />
          )}
        </Container>
      </Section>
    </>
  );
};

export default Drinks;
