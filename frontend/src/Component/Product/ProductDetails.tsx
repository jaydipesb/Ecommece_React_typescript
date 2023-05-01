import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import currencyFormatter from "currency-formatter";
import { BsDash, BsPlus } from "react-icons/bs";
import axios from "axios";

import { selectedProduct } from "../../redux/actions/productsActions";
import UserHeader from "../UserHeader";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  console.log("Tota quentity = ", quantity);
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();


  interface Product {
    product: {
      image: string,
      title: string,
      price: number,
      id: number,
      description: string
    }
  }

  interface IValue {
    image: string,
    title: string,
    price: number,
    id: string,
    description: string,
    quantity: any
  }
   
  interface Product {
    id: number,
    category: string,
    description: string,
    image: string,
    price: number,
    rating: object,
    title: string
  }



  interface Cart {
    cart: {
      products: Array<IValue>
    }

  }

  let product = useSelector((state: Product) => state.product);
  console.log("product", product);

  let quentityData = useSelector((state: Cart) => state.cart);
  console.log(quentityData.products);

  let item = quentityData.products.filter((obj) => obj.id == id);
  console.log(item);
  let quentityShow;
  if (item.length != 0) {
    console.log("hello jaydip");
    console.log(item[0].quantity);
    quentityShow = item[0].quantity;
  } else {
    quentityShow = "";
  }
  console.log("q", quentityShow);

 

  const fetchProductDetail = (id: string): void => {
    const productUrl = `https://fakestoreapi.com/products/${id}`;
    axios.get<Product[]>(productUrl).then((res) => {
      console.log("res", res.data);
      dispatch(selectedProduct(res.data));
    });
  };

  useEffect(() => {
    if (id && id !== "")
      fetchProductDetail(id);
  }, [id]);



  return (
    <>
      <UserHeader />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="details__image">
              <img src={`${product.image}`} alt="" />
            </div>
          </div>
          <div className="col-6">
            <div className="details__name">{product.title}</div>
            <div className="details__prices">
              {currencyFormatter.format(product.price, { code: 'INR' })}
            </div>
            <div className="details__info">
              <div className="details__incDec">
                {quentityShow >= 1 ? (
                  <>
                    <span
                      className="dec"
                      onClick={() =>
                        dispatch({ type: "DEC", payload: product.id })
                      }
                    >
                      {" "}
                      <BsDash />
                    </span>
                    <span className="quantity">{quentityShow}</span>
                    <span
                      className="inc"
                      onClick={() =>
                        dispatch({ type: "INC", payload: product.id })
                      }
                    >
                      <BsPlus />
                    </span>
                  </>
                ) : (
                  ""
                )}
                {quentityShow >= 1 ? (
                  ""
                ) : (
                  <>
                    <button
                      className="btn-default"
                      onClick={() =>
                        dispatch({
                          type: "ADD_TO_CART",
                          payload: { product, quantity },
                        })
                      }
                    >
                      Add to cart
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="details__p">
              <h4>Details</h4>
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default ProductDetails;