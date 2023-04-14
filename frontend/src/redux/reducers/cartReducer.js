const initialState = {
    products: [],
    totalPrice: 0,
    totalQuantities: 0,
    id:0,
}

export const cartReducer = (state = initialState, { type, payload }) => {
    console.log("hello type");
   
    let findPro;
    let index;
    switch (type) {
        case 'ADD_TO_CART':
            const {product,quantity} = payload;
            const check = state.products.find(pr => pr.id === product.id);
            if(check){
                return state;
            } 
            else{
                const Tprice = state.totalPrice + product.price * quantity;
                const Tquentites = state.totalQuantities + quantity;
                product.quantity = quantity;
                return {
                    ...state, products:[...state.products, product],
                    totalPrice:Tprice, 
                    totalQuantities:Tquentites
                }
            }

            case 'INC':
               findPro= state.products.find(product => product.id === payload);
               index= state.products.findIndex(product => product.id === payload);
               findPro.quantity +=1;
               state.products[index] = findPro;

               return{
                ...state,
                totalPrice: state.totalPrice + findPro.price, 
                totalQuantities: state.totalQuantities+1
               }
            
            case 'DEC':
                findPro = state.products.find(product=>product.id === payload);
                index = state.products.findIndex(product => product.id === payload);
                if(findPro.quantity > 1){
                    findPro.quantity -=1;
                    state.products[index] = findPro;
                    return {
                        ...state,
                        totalPrice: state.totalPrice - findPro.price,
                        totalQuantities: state.totalQuantities -1
                    }
                }
            case 'REMOVE':
                findPro = state.products.find(product => product.id === payload);
                const filtered = state.products.filter(product=> product.id !== payload);
                return{
                    ...state,
                    products:filtered,
                    totalPrice: state.totalPrice - findPro.price*findPro.quantity,
                    totalQuantities: state.totalQuantities - findPro.quantity
                }
            case 'ADD_USER_PRODUCT':
                return{
                    ...state,
                    id:payload,
                }
            default:
                return state 
    }
  };