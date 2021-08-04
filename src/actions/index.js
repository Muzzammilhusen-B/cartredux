import { ADD_TO_CART, REMOVE_ITEM } from "./types";

export const addToCart = (id) => {
  return { type: ADD_TO_CART, id };
};

export const remove = (id) => {
  return { type: REMOVE_ITEM, id };
};
