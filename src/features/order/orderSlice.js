import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, fetchOrder, updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  totalOrders:0,
  currentOrder:null,  // we may need more order place info
  value:0,
  status: 'idle'
};

export const fetchOrderAsync = createAsyncThunk(
  'order/fetchOrder',
  async (amount) => {
    const response = await fetchOrder(amount);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort,pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
    return response.data;
  }
);

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async ({order,alert},{rejectWithValue}) => {
     try {
      const response = await  createOrder(order);
      return response.data   
    } catch (error) {
     alert.error("Order Qty is more than stock");
      return rejectWithValue(error)
    }

  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await  updateOrder(order);
    return response.data;
  }
);


export const orderSlice = createSlice({
  name: 'order',
  initialState,

  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.data;
        state.totalOrders=action.payload.totalOrders
      })
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder=action.payload;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = 'idle';
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.orders.findIndex(item=>item.id===action.payload.id)
        state.orders[index]=action.payload
       
      })
      ;
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectedOrders = (state) => state.order.orders;
export const selectcurrentOrder=(state)=>state.order.currentOrder;
export const selectTotalOrders=(state)=>state.order.totalOrders;
export const selectStatus=(state)=>state.order.status;

export default orderSlice.reducer;
