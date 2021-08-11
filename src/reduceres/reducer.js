// import _ from "lodash";
// import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

import {
  ADD_QUANTITY,
  ADD_TO_CART,
  ALLCATEGORY,
  FETCH_DATA,
  // GENERAL,
  // MUSIC,
  REMOVE_ITEM,
  // SPORTS,
  SUB_QUANTITY,
} from "../actions/types";
import { loadFromLocalStorage } from "../localStorage";
// import { product } from "../localStorage";
// import { loadFromLocalStorage } from "../localStorage";

const initialState = {
  items: [],
  addedItems: [],
  count: 0,
  total: 0,
};

const reducer = (state = initialState, action) => {
  //data fetch
  if (action.type === FETCH_DATA) {
    let data = loadFromLocalStorage();
    return {
      ...state,
      items: data.items,
    };
  }

  if (action.type === ADD_TO_CART) {
    // console.log("state items in reduceer before", state.addedItems);
    let addedItem = state.items.find((item) => item.id === action.id);
    // console.log("added item reducer", addedItem);
    let existed_item = state.addedItems.find((item) => action.id === item.id);
    console.log("existed item", existed_item);
    let newCount = state.count + addedItem.amount;
    // console.log("New count on add to cart", newCount);
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price,
        count: newCount,
      };
    } else {
      addedItem.quantity = 1;
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
        count: newCount,
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    // console.log("addeditems in remove action", state.addedItems);
    let itemToRemove = state.addedItems.find((item) => action.id === item.id);
    console.log("item to remove", itemToRemove);

    let new_items = state.addedItems.filter((item) => action.id !== item.id);
    let new_count = state.count - itemToRemove.quantity;

    //calculation of total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,

      count: new_count,
    };
  }
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    let new_Count = state.count + addedItem.quantity;
    console.log("New count on add to cart", new_Count);

    addedItem.quantity += 1;

    //calc total
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
      count: new_Count,
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);

    //if quantity=0 then it should e removed
    if (addedItem.quantity === 0) {
      let new_items = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      let new_count = state.count - addedItem.amount;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
        count: new_count,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      let new_count = state.count - addedItem.amount;
      return {
        ...state,
        total: newTotal,
        count: new_count,
      };
    }
  }

  //for all category display
  if (action.type === ALLCATEGORY) {
    let selectedCategory = state.category.find((item) => action.id === item.id);
    // console.log("selected category in reducer", selectedCategory);

    return {
      ...state,
      items: state.items,
      category: state.category,
    };
  }
  return state;
};
export default reducer;

//for general item
// if (action.type === GENERAL) {
//   let remainItems = state.items;
//   console.log("remain items", remainItems);
//   const renderGeneral = state.items.filter((item) => item.categoryId === 1);
//   console.log("slice item", renderGeneral);
//   // .map((item) =>
//   //   item.categoryId === 1 ? item : undefined
//   // );
//   // const rend = _.compact(renderGeneral);
//   // const rend = renderGeneral.filter((element) => element !== undefined);
//   // console.log("GE", rend);
//   return {
//     ...state,
//     items: renderGeneral,
//   };
// } //for sports item
// if (action.type === SPORTS) {
//   const renderSports = state.items.filter((item) => item.categoryId === 2);
//   //   item.categoryId === 2 ? item : undefined
//   // );
//   // const rend = renderSports.filter((element) => element !== undefined);
//   // console.log("SE", rend);
//   return {
//     ...state,
//     items: renderSports,
//   };
// } //for music item
// if (action.type === MUSIC) {
//   const renderMusic = state.items.filter((item) => item.categoryId === 3);
//   // item.categoryId === 3 ? item : undefined
//   // );
//   // const rend = renderMusic.filter((element) => element !== undefined);
//   // console.log("ME", rend);
//   return {
//     ...state,
//     items: renderMusic,
//   };
// }
