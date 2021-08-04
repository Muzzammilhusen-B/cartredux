import { ADD_TO_CART } from "../actions/types";
// import { product } from "../localStorage";
// import { loadFromLocalStorage } from "../localStorage";
// import store, { saveToLocalStorage } from "../localStorage";

const initialState = {
  items: [],
  addedItems: [],
  count: 0,
  total: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find((item) => item.id === action.id);
    let existed_item = state.addedItems.find((item) => action.id === item.id);
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
      };
    }
  }
  return state;
};
export default reducer;
