interface Products {
  id: number,
  category: string,
  description: string,
  image: string,
  title: string,
}

const intialState = {
  products: [],
};

export const productsReducer = (state = intialState, action: { payload: Products[], type: string }) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, action: { payload: Products[], type: string }) => {
  console.log("type", action.type);
  switch (action.type) {
    case "SELECTED_PRODUCT":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
