import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsDash, BsPlus } from "react-icons/bs";
import { BsReverseBackspaceReverse } from "react-icons/bs";
import { message } from "antd";
import currencyFormatter from "currency-formatter";
import UserHeader from "../UserHeader";

const CartDetails = () => {
  const initialValues = {
    products: [],
    totalPrice: 0,
    totalQuantities: 0,
    id: 0,
  };


  interface ProductData {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    quantity: number,
    image: number,
  }

  interface CartItem {
    cart: {
      products: Array<ProductData>,
      totalQuantities: number,
      totalPrice: number
    }
  }

  interface CartId {
    cart: {
      id: number,
    }
  }

  let user = useSelector((state: CartItem) => state.cart);
  console.log("user", user);
  let usercartID = useSelector((state: CartId) => state.cart.id);
  let filteredData = [];
  const auth = localStorage.getItem("user");
  if (auth) {
    const userId = JSON.parse(auth)[0].id;
    console.log("Auth User ID", userId);
    console.log("usecartid", usercartID);

    if (userId == usercartID) {
      filteredData.push(user);
    } else {
      filteredData.push(initialValues);
    }
  } else {
    filteredData.push(user);
  }
  console.log("filteredData", filteredData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkout = () => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/checkout");
    } else {
      message.warning("please Login");
      navigate("/login");
    }
  };

  return (
    <>
      <UserHeader />
      <div className="container">

        <h3>Your cart</h3>
        {filteredData[0].products.length > 0 ? (
          <>
            <div className="row">
              <div className="col-9">
                <div className="cart__heading">
                  <div className="row">
                    <div className="col-2">Picture</div>
                    <div className="col-2">Name</div>
                    <div className="col-2">Price</div>
                    <div className="col-2">Inc/Dec</div>
                    <div className="col-2">Total Price</div>
                    <div className="col-2">Remove</div>
                  </div>
                  <>
                  </>
                </div>
                {filteredData[0].products.map((product) => (
                  <div className="row verticalAlign" key={product.id}>
                    <div className="col-2">
                      <div className="cart__image">
                        <img src={`${product.image}`} alt="" />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="cart__name">{product.title}</div>
                    </div>
                    <div className="col-2">
                      {currencyFormatter.format(product.price, { code: "INR" })}
                    </div>
                    <div className="col-2">
                      <div className="details__info cart__incDec">
                        <div className="details__incDec">
                          <span
                            className="dec"
                            onClick={() =>
                              dispatch({ type: "DEC", payload: product.id })
                            }
                          >
                            <BsDash />
                          </span>
                          <span className="quantity">{product.quantity}</span>
                          <span
                            className="inc"
                            onClick={() =>
                              dispatch({ type: "INC", payload: product.id })
                            }
                          >
                            <BsPlus />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="cart__total text-center">
                        {(product.price * product.quantity).toFixed(2)}
                      </div>
                    </div>
                    <div className="col-2">
                      <div
                        className="cart__remove"
                        onClick={() =>
                          dispatch({ type: "REMOVE", payload: product.id })
                        }
                      >
                        <BsReverseBackspaceReverse />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-3 summary-col">
                <div className="summary">
                  <div className="summary__heading">Summary</div>
                  <div className="summary__details">
                    <div className="row mb-10">
                      <div className="col-6">Total Items:</div>
                      {filteredData[0].totalQuantities}
                    </div>
                    <div className="row mb-10">
                      <div className="col-6">Total Price</div>
                      {currencyFormatter.format(filteredData[0].totalPrice, {
                        code: "INR",
                      })}
                    </div>
                    <button
                      type="button"
                      className="checkout"
                      onClick={() => checkout()}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          "Your cart is empty!"
        )}
      </div>
    </>
  );
};

export default CartDetails;
