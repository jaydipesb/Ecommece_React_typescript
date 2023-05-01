
export const setProducts = (products: object) => {
  return {
    type: "SET_PRODUCTS",
    payload: products,
  };
};

export const selectedProduct = (product:object) => {
 
  return {
    type: "SELECTED_PRODUCT",
    payload: product,
  };
};