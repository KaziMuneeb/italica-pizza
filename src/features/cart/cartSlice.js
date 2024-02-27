import { createSlice } from "@reduxjs/toolkit";

const cartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuatity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity === 1) return;
      item.quantity -= 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

const getTotalPizzaQuntity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

const getTotalPizzaPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const {
  addItem,
  deleteItem,
  increaseQuatity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export { getTotalPizzaQuntity, getTotalPizzaPrice };
