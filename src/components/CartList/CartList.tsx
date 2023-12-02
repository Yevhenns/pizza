import React, { FC } from 'react';
import CartListItem from './components/CartListItem/CartListItem';
import Button from '@/UI/basic/Button/Button';
import css from './CartList.module.scss';

interface Props {
  filledCart: TCart;
  deleteCartItem: (_id: string) => void;
  deleteAllProducts: () => void;
}

const CartList: FC<Props> = ({
  filledCart,
  deleteCartItem,
  deleteAllProducts,
}) => {
  return (
    <div className={css.cartList}>
      {filledCart.map(data => {
        return (
          <CartListItem
            key={data._id}
            deleteCartItem={deleteCartItem}
            data={data}
          />
        );
      })}
      <Button onClick={deleteAllProducts} type="button">
        Очистити кошик
      </Button>
    </div>
  );
};

export default CartList;