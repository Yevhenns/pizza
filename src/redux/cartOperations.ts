import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendOrder = createAsyncThunk<
  any,
  any,
  {
    rejectValue: any;
  }
>('cart/sendOrder', async (order, { rejectWithValue }) => {
  try {
    await axios.post(
      'https://xata-magnata-server.onrender.com/',
      {
        body: JSON.stringify(order),
      }
    );
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
