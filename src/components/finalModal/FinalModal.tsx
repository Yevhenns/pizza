/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { nanoid } from 'nanoid';
import css from './FinalModal.module.css';
import { useAppSelector } from '@/redux/hooks';
import { getCustomerInfo, getFilledCart } from '@/redux/cartSlice';

const FinalModal: React.FC<TFinalModal> = ({ open, finalAction }) => {
  const filledCart = useAppSelector(getFilledCart);
  const info = useAppSelector(getCustomerInfo);

  const { address, comment, delivery, name, number, sum } = info;

  return (
    <div>
      <Modal className={css.modalWrapper} open={open}>
        <div className={css.modal}>
          <p>Інформація про замовлення</p>
          <ul>
            {filledCart.map(({ title, quantity, totalPrice }) => {
              return (
                <li key={nanoid()}>
                  <p>Назва:{title}</p>
                  <p>Кількість: {quantity}</p>
                  <p>Ціна: {totalPrice}</p>
                </li>
              );
            })}
          </ul>
          <p>Інформація про замовника</p>
          <ul>
            <li>
              <p>Ім'я: {name}</p>
            </li>
            <li>
              <p>Номер телефону: {number}</p>
            </li>
            {delivery !== false ? (
              <li>
                <p>Доставка: Так</p>
              </li>
            ) : (
              <li>
                <p>Доставка: Ні</p>
              </li>
            )}
            {address && (
              <li>
                <p>Адреса: {address}</p>
              </li>
            )}
            {comment && (
              <li>
                <p>Коментар: {comment}</p>
              </li>
            )}
            <li>
              <p>Загальна сума {sum} грн</p>
            </li>
          </ul>
          <Button
            onClick={finalAction}
            variant="contained"
            sx={{
              display: 'flex',
              mx: 'auto',
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FinalModal;
