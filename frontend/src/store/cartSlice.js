import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [], // load saved cart if exists
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // save
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // save
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((x) => x._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // save
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems"); // clear
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
