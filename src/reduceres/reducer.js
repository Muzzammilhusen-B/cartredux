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
  count: 0,
  total: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === ADD_TO_CART) {
    // console.log("state items in reduceer before", state.addedItems);
    let addedItem = state.items.find((item) => item.id === action.id);
    // console.log("added item reducer after", addedItem);
    // let newCount = state.count;
    // + addedItem.quantity;
    // console.log("Quantity", newCount);
    let existed_item = state.addedItems.find((item) => action.id === item.id);
    console.log("existed item", existed_item);
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
        // + state.addedItems.quantity,
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    // console.log("addeditems in remove action", state.addedItems);
    let itemToRemove = state.addedItems.find((item) => action.id === item.id);
    console.log("item to remove", itemToRemove);

    let new_items = state.addedItems.filter((item) => action.id !== item.id);
    let new_count = state.count - itemToRemove.quantity >= 0 ? state.count : 0;

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
    let addedItem = state.items.find((item) => item.id === action.id);

    //if quantity=0 then it should e removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      // let new_count = state.count - addedItem.quantity;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
        // count: new_count,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      // let new_count = state.count - addedItem.quantity;
      return {
        ...state,
        total: newTotal,
        // count: new_count,
      };
    }
  }
  return state;
};
export default reducer;
