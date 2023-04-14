import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions/productsActions";
import currencyFormatter from "currency-formatter";
import UserHeader from "../UserHeader";

const ProductListing = () => {

  interface ProductDetail {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string
  }

  interface AllProducts {
    allProducts: {
      products: ProductDetail[],
    }
    product: ProductDetail[],
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

  interface ProductResponse {
    data: Product[]
  }

  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = (): void => {
    const productUrl = "https://fakestoreapi.com/products";
    axios.get<Product[]>(productUrl).then((res) => {
      console.log("res", res.data);
      setProducts(res.data);
    });
  };

  console.log("products", products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const CATEGORIES = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];



  const [filterTags, setFilterTags] = useState<any>([]);
  const [seachProduct, setsearchProduct] = useState("");
  console.log("seachProduct", seachProduct);
  
  interface Inode {
    id: number,
    name: string,
  }

  const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e);
    if (e.target.checked) {
      setFilterTags([...filterTags, e.target.value]);
    } else {
      setFilterTags(
        filterTags.filter((filterTag: string) => filterTag !== e.target.value)
      );
    }
  };

  console.log(filterTags);

  const filteredData = [];

  if (filterTags.length > 0) {
    for (let tag in filterTags) {
      filteredData.push(
        ...products.filter((product: { [x: string]: any; }) => product["category"] === filterTags[tag])
      );
    }
  } else if (seachProduct !== "") {
    console.log("call seacrh product function");
    let filterSearch = products.filter((item: { category: string; }) => {
      console.log(item.category);
      if (item.category.toLowerCase().includes(seachProduct.toLowerCase())) {
        console.log("item", item);
        return item;
      }
    });
    console.log(filterSearch);
    filteredData.push(...filterSearch);
  } else {
    filteredData.push(...products);
  }
  console.log(products);


  return (
    <>
      <UserHeader />
      <div className="filters">
        <header id="filters-header">{"Filters"}</header>
        <ul>
          {CATEGORIES.map((category) => (
            <li key={category}>
              <label>
                <input
                  onChange={filterHandler}
                  type="checkbox"
                  value={category}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="searchProduct">
        <input
          type="text"
          name="seachproduct"
          onChange={(e) => setsearchProduct(e.target.value)}
        />
        <button>Search</button>
      </div>
      <div className="container">
        <div className="row">
          {filteredData.map((product) => (
            <div className="col-3" key={product.id}>
              <div className="product">
                <div className="product__img">
                  <Link to={`/details/${product.id}`}>
                    <img src={`${product.image}`} alt="image name" />
                  </Link>
                </div>
                <div className="product__name">{product.category}</div>
                <div className="row">
                  <div className="col-6">
                    <div className="product__price">
                      {currencyFormatter.format(product.price, { code: "INR" })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductListing;