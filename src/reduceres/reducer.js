import {
  ADD_QUANTITY,
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
} from "../actions/types";
// import { product } from "../localStorage";
// import { loadFromLocalStorage } from "../localStorage";

const initialState = {
  items: [],
  addedItems: [],
  count: [],
  total: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find((item) => item.id === action.id);
    console.log("added item reducer", addedItem);
    let existed_item = state.addedItems.find((item) => action.id === item.id);
    // let new_count = state.count + addedItem.quantity;
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price,
      };
    } else {
      addedItem.quantity = 1;
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
        count: state.count + addedItem.quantity,
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find((item) => action.id === item.id);
    let new_items = state.addedItems.filter((item) => action.id !== item.id);
    let new_count = state.count - new_items.quantity;

    //calculation of total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    console.log("item to remove", itemToRemove);
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
      count: new_count,
    };
  }
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    // addedItem.quantity += 1;
    // let new_count = state.count + addedItem.quantity;

    //calc total
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
      // count: new_count,
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find((item) => action.id === item.id);

    //if quantity=0 then it should e removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      let new_count = state.count - addedItem.quantity;
      return {
        ...state,
        addedItem: new_items,
        total: newTotal,
        count: new_count,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      let new_count = state.count - addedItem.quantity;
      return {
        ...state,
        total: newTotal,
        count: new_count,
      };
    }
  }
  return state;
};
export default reducer;
