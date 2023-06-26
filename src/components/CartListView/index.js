import React from "react";
import CartItem from "../CartItem";
import "./index.css";

const CartListView = ({ cartList, getCartList }) => (
  <ul className="cart-list">
    {cartList.map((eachCartItem) => (
      <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} getCartList={getCartList} />
    ))}
  </ul>
);

export default CartListView;
