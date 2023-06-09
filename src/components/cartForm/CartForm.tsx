import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { addInfo, getCustomerInfo, getFilledCart } from '@/redux/cartSlice';
import css from './CartForm.module.css';

const CartForm: React.FC<TOpenModal> = ({ openModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TFinalForm>({ mode: 'onChange' });

  const [totalPayment, setTotalPayment] = useState(0);

  const payment = useSelector(getFilledCart);
  const info = useSelector(getCustomerInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const result = payment
      .map((element: { totalPrice: number }) => element.totalPrice)
      .reduce((acc: number, val: number) => acc + val, 0);
    setTotalPayment(result);
  }, [payment]);

  const onSubmit: SubmitHandler<TFinalForm> = data => {
    openModal();
    const customerInfo = {
      address: data.address,
      comment: data.comment,
      delivery: data.delivery,
      name: data.name,
      number: data.number,
      sum: totalPayment,
    };
    dispatch(addInfo(customerInfo));
    reset();
  };

  const delivery = watch('delivery');

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name', { required: "Це обов'язкове поле!" })}
          id="customer-name"
          label="Ім'я"
          variant="outlined"
        />
        {errors?.name && (
          <div style={{ color: 'red' }}>{errors.name.message}</div>
        )}

        <TextField
          {...register('number', { required: "Це обов'язкове поле!" })}
          id="customer-number"
          label="Номер телефону"
          variant="outlined"
        />
        {errors?.number && (
          <div style={{ color: 'red' }}>{errors.number?.message}</div>
        )}

        <div>
          <input type="checkbox" id="delivery" {...register('delivery')} />
          <label htmlFor="delivery">Доставка</label>
        </div>

        {delivery && (
          <>
            <TextField
              {...register('address', { required: "Це обов'язкове поле!" })}
              id="address"
              label="Введіть адресу"
              variant="outlined"
            />
            {errors?.address && (
              <div style={{ color: 'red' }}>{errors.address?.message}</div>
            )}
          </>
        )}

        <FormControl>
          <FormLabel>Коментар</FormLabel>
          <Textarea
            id="comment"
            placeholder="Введіть коментар"
            minRows={2}
            {...register('comment')}
          />
        </FormControl>

        <Button type="submit" variant="contained">
          До оплати {totalPayment} грн
        </Button>
      </form>
    </>
  );
};

export default CartForm;
