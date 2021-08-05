import { ADD_QUANTITY, ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY } from "./types";

//add to cart
export const addToCart = (id) => {
  return { type: ADD_TO_CART, id };
};

//remove from cart
export const remove = (id) => {
  return { type: REMOVE_ITEM, id };
};

//add quantity action
export const addQuantity = (id) => {
  return { type: ADD_QUANTITY, id };
};

//subtract quan.
export const subQuantity = (id) => {
  return { type: SUB_QUANTITY, id };
};
