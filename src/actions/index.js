import {
  ADD_QUANTITY,
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  FETCH_DATA,
  // GENERAL,
  // SPORTS,
  // MUSIC,
  ALLCATEGORY,
  HOME,
  ADD_CATEGORY,
  ADD_PRODUCT,
  SEARCH_ITEM,
  REMOVE_PRODUCT,
} from "./types";
// import { loadFromLocalStorage } from "../localStorage";

// const data = loadFromLocalStorage();

//fetch data
export const fetchData = (data) => {
  return {
    type: FETCH_DATA,
    data,
  };
};

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

//display All category
export const allCategory = (id) => {
  return { type: ALLCATEGORY, id };
};
//show home page
export const home = (data) => {
  return { type: HOME, data };
};
//ADD CATEGORY
export const addCategory = (data) => {
  return { type: ADD_CATEGORY, payload: data };
};
//ADD product
export const addProduct = (data) => {
  return { type: ADD_PRODUCT, payload: data };
};
//SERACH ITEM
export const searchItem = (value) => {
  return { type: SEARCH_ITEM, payload: value };
};
//remove product
export const removeProduct = (id) => {
  return { type: REMOVE_PRODUCT, payload: id };
};
