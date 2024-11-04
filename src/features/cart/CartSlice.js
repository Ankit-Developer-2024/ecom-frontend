import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,deleteItemToCart,fetchItemByUserId, resetCart, updateToCart } from './CartAPI';

const initialState = {
  value: 0,
  items:[],
  cartLoaded: false,
  status: 'idle'
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({newItem,alert}) => {
    const response = await addToCart(newItem);
      alert.success("Item added to cart");
    return response.data;
  }
);

export const fetchItemByUserIdAsync = createAsyncThunk(
  'cart/fetchItemByUserId',
  async () => {
    const response = await fetchItemByUserId();
    return response.data;
  }
);


export const updateToCartAsync = createAsyncThunk(
  'cart/updateToCart',
  async (update) => {
    const response = await updateToCart(update);
    return response.data;
  }
);


export const deleteItemToCartAsync = createAsyncThunk(
  'cart/deleteItemToCart',
  async (id) => {
    const response = await deleteItemToCart(id);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    return response.data;
  }
);


export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartLoaded = true;
      })
      .addCase(updateToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=action.payload;
      })
      .addCase(deleteItemToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[]
      })
      ;
  },
});

export const { increment } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectCartLoaded = (state) => state.cart.cartLoaded;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;
