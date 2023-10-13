import { createSlice } from '@reduxjs/toolkit';
import { sendOrder } from './cartOperations';

type CartItem = {
  id: string;
  photo: string;
  quantity: number;
  title: string;
  totalPrice: number;
};

type Cart = CartItem[];

type Info = {
  address?: string | undefined;
  comment?: string | undefined;
  delivery: boolean;
  name: string;
  number: string;
  sum: number;
};

const initialState = {
  filledCart: [] as Cart,
  customerInfo: {} as Info,
  error: false as any,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: { payload: CartItem }) {
      state.filledCart = [...state.filledCart, action.payload];
    },
    deleteItem(state, action: { payload: string }) {
      state.filledCart = state.filledCart.filter(
        item => item.id !== action.payload
      );
    },
    addInfo(state, action: { payload: Info }) {
      state.customerInfo = action.payload;
    },
    deleteAllItems(state) {
      state.filledCart = [];
      state.customerInfo = {} as Info;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(sendOrder.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log('error');
          // toast.error(`Невірний номер посилки!`);
          state.isLoading = false;
          console.log('ok');
          return;
        }        
        state.isLoading = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        console.log('err');
        // toast.error(`Помилка мережі!`);
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const cartReducer = cartSlice.reducer;

export const getFilledCart = (state: { cart: { filledCart: Cart } }) =>
  state.cart.filledCart;
export const getCustomerInfo = (state: { cart: { customerInfo: Info } }) =>
  state.cart.customerInfo;

export const { addItem } = cartSlice.actions;
export const { deleteItem } = cartSlice.actions;

export const { addInfo } = cartSlice.actions;
export const { deleteAllItems } = cartSlice.actions;
