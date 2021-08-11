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
//display general
// export const general = (id) => {
//   return { type: GENERAL, id };
// };
// //display sports
// export const sports = (id) => {
//   return { type: SPORTS, id };
// }; //display music
// export const music = (id) => {
//   return { type: MUSIC, id };
// };
//display All category
export const allCategory = (id) => {
  return { type: ALLCATEGORY, id };
};
