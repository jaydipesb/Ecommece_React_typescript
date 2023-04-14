import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsFillBagFill } from "react-icons/bs";


const Nav = () => {
  const { totalQuantities } = useSelector((state) => state.cart);
  const auth = localStorage.getItem("user");
  console.log(auth);
  if(auth){
    let id= auth.id;
  }
 
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  
  return (
    <>
   <div className="header">
 
      {auth ? (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/product">Home</Link>
          </li>
          <li>
            <Link onClick={logout} to="/login">
              Logout{" "}
            </Link>
          </li>

          <li>
            <Link to="/cart">
              <BsFillBagFill className="cart-icon" />
              <span>{totalQuantities}</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
           <li className="nav-li nav-left">
            <Link to="/product">Home</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/cart">
              <BsFillBagFill className="cart-icon" />
              <span>{totalQuantities}</span>
            </Link>
          </li>
        </ul>
      )}
      </div>
    </>
  );
};
export default Nav;
