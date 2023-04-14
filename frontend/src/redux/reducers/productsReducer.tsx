
const intialState = {
  products: [],
};

export const productsReducer = (state = intialState, action:{payload:any, type:string}) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {},  action:{payload:any, type:string}) => {
  console.log("type",action.type);
  switch (action.type) {
    case "SELECTED_PRODUCT":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
