// import _ from "lodash";
// import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

import {
  ADD_CATEGORY,
  ADD_PRODUCT,
  ADD_QUANTITY,
  ADD_TO_CART,
  ALLCATEGORY,
  FETCH_DATA,
  HOME,
  // GENERAL,
  // MUSIC,
  REMOVE_ITEM,
  REMOVE_PRODUCT,
  SEARCH_ITEM,
  // SPORTS,
  SUB_QUANTITY,
} from "../actions/types";
import {
  // loadFromLocalStorage,
  product,
  // saveToLocalStorage,
} from "../localStorage";

const initialState = {
  items: [],
  addedItems: [],
  count: 0,
  total: 0,
  category: product.category,
};

const reducer = (state = initialState, action) => {
  //data fetch
  if (action.type === FETCH_DATA) {
    let data = product;
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
        total: parseInt(state.total) + parseInt(addedItem.price),
        count: newCount,
      };
    } else {
      addedItem.quantity = 1;
      let newTotal = parseInt(state.total) + parseInt(addedItem.price);
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
    console.log("item to remove", itemToRemove.id);

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
    let newTotal = parseInt(state.total) + parseInt(addedItem.price);
    return {
      ...state,
      total: newTotal,
      count: new_Count,
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);

    //if quantity=0 then it should be removed
    if (addedItem.quantity === 0) {
      let new_items = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = parseInt(state.total) - parseInt(addedItem.price);
      let new_count = state.count - addedItem.amount;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
        count: new_count,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = parseInt(state.total) - parseInt(addedItem.price);
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
    let selectedCategory = state.category.find(
      (item) => action.id === item.cat_id
    );
    console.log("selected category in reducer", selectedCategory);
    let allItems = product;
    console.log("all items", allItems);
    let itemToDisplay = allItems.items.filter(
      (item) => selectedCategory.cat_name === item.categoryName
    );
    // let newItem = state.items.filter((item) => item !== itemToDisplay);

    console.log("Items to display particular category", itemToDisplay);

    if (itemToDisplay.length > 0) {
      return {
        ...state,
        items: itemToDisplay,

        category: state.category,
      };
    } else {
      return {
        ...state,
        items: allItems.items,
        category: state.category,
      };
    }
  }
  //for home
  if (action.type === HOME) {
    let oldData = product;
    return {
      ...state,
      items: oldData.items,
    };
  }
  if (action.type === ADD_CATEGORY) {
    let newCategory = state.category.map((item) => item);
    // .find((item) => item.id !== action.id);
    console.log("after add cat state", state);

    return { ...state, category: newCategory };
  }
  if (action.type === ADD_PRODUCT) {
    let newProduct = state.items.map((item) => item);
    // .find((item) => item.id !== action.id);
    console.log("after add cat state", state);

    return { ...state, items: newProduct };
  }
  if (action.type === SEARCH_ITEM) {
    let allItems = product;
    const searchedItems = allItems.items.filter(
      (item) => item.name === action.payload
    );
    console.log("searched item by reduer", searchedItems);
    if (searchedItems) {
      return { ...state, items: searchedItems };
    }
    return { ...state, items: state.items };
  }
  if (action.type === REMOVE_PRODUCT) {
    const selectedProduct = state.items.find((item) => item.id === action.id);
    console.log("selected product re", selectedProduct);
    const removeProduct = state.items.filter(
      (item) => item.id !== selectedProduct
    );
    console.log("remove product re", removeProduct);
    if (selectedProduct) {
      return {
        ...state,
        items: removeProduct,
      };
    }
    return { ...state, items: state.items };
  }
  return state;
};
export default reducer;
