interface ProductDetail {
    id?: number | undefined,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    quantity: number
}

interface CounterState {
    products: ProductDetail[],
    totalPrice: number,
    totalQuantities: number,
    id: number
}


interface AddProducts {
    product: ProductDetail,
    quantity: number
}

const initialState: CounterState = {
    products: [],
    totalPrice: 0,
    totalQuantities: 0,
    id: 0,
}

export const cartReducer = (state = initialState, action: { type: string, payload: any }) => {

    let findPro: any;
    let index: any;
    switch (action.type) {
        case 'ADD_TO_CART':   
            const { product, quantity } = action.payload;
            const check = state.products.find(pr => pr.id === product.id);
            if (check) {
                return state;
            }
            else {
                const Tprice = state.totalPrice + product.price * quantity;
                const Tquentites = state.totalQuantities + quantity;
                product.quantity = quantity;
                return {
                    ...state, products: [...state.products, product],
                    totalPrice: Tprice,
                    totalQuantities: Tquentites
                }
            }

        case 'INC':
            findPro = state.products.find(product => product.id === action.payload);
            index = state.products.findIndex(product => product.id === action.payload);
            findPro.quantity += 1;
            state.products[index] = findPro;
            return {
                ...state,
                totalPrice: state.totalPrice + findPro.price,
                totalQuantities: state.totalQuantities + 1
            }

        case 'DEC':
            findPro = state.products.find(product => product.id === action.payload);
            index = state.products.findIndex(product => product.id === action.payload);
            if (findPro.quantity > 1) {
                findPro.quantity -= 1;
                state.products[index] = findPro;
                return {
                    ...state,
                    totalPrice: state.totalPrice - findPro.price,
                    totalQuantities: state.totalQuantities - 1
                }
            }
        case 'REMOVE':
            findPro = state.products.find(product => product.id === action.payload);
            const filtered = state.products.filter(product => product.id !== action.payload);
            return {
                ...state,
                products: filtered,
                totalPrice: state.totalPrice - findPro.price * findPro.quantity,
                totalQuantities: state.totalQuantities - findPro.quantity
            }
        case 'ADD_USER_PRODUCT':
            return {
                ...state,
                id: action.payload,
            }
        default:
            return state
    }
};