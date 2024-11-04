import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchProductByFilter ,fetchBrands,fetchCatgeories, fetchProductById, createProduct, updateToProduct} from './productAPI';

const initialState = {
  products: [],
  categories:[],
  brands:[],
  selectedProduct:null,
  totalItems:0,
  status: 'idle'
};


export const fetchProductByIdAsync = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {   
    const response = await fetchProductById(id);
     return response.data;
  }
);


export const fetchProductByFilterAsync = createAsyncThunk(
  'products/fetchProductByFilter',
  async ({filter,sort,pagination,admin}) => {
    const response = await fetchProductByFilter(filter,sort,pagination,admin);
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'products/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetchCatgeories();
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'products/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateToProductAsync = createAsyncThunk(
  'products/updateToProduct',
  async (product) => {
    const response = await updateToProduct(product);
    return response.data;
  }
);




export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByFilterAsync.pending,(state,action)=>{
        state.status='loading';
      })
      .addCase(fetchProductByFilterAsync.fulfilled,(state,action)=>{
        state.products=action.payload.products;
        state.totalItems=action.payload.totalItems;
        state.status='idle'
      })
      .addCase(fetchBrandsAsync.pending,(state,action)=>{
        state.status='loading';
      })
      .addCase(fetchBrandsAsync.fulfilled,(state,action)=>{
        state.brands=action.payload;
        state.status='idle'
      })
      .addCase(fetchCategoriesAsync.pending,(state,action)=>{
        state.status='loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled,(state,action)=>{
        state.categories=action.payload;
        state.status='idle'
      })
      .addCase(fetchProductByIdAsync.pending,(state,action)=>{
        state.status='loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled,(state,action)=>{
        state.selectedProduct=action.payload;
        state.status='idle'
      })   
      .addCase(createProductAsync.pending,(state,action)=>{
        state.status='loading';
      })
      .addCase(createProductAsync.fulfilled,(state,action)=>{
        state.products.push(action.payload)
          state.status='idle'
      })   
      .addCase(updateToProductAsync.pending,(state,action)=>{
        state.status='loading';
      })
      .addCase(updateToProductAsync.fulfilled,(state,action)=>{
        const index=state.products.findIndex((product)=>product.id===action.payload.id)
        state.products[index]=action.payload
          state.status='idle'
      })   
      ;
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductsLoading  = (state) => state.product.status;
export const selectBrands  = (state) => state.product.brands;
export const selectCategories  = (state) => state.product.categories;

export default productSlice.reducer;
