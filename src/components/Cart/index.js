import { Component } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import EmptyCartView from "../EmptyCartView";
import CartListView from "../CartListView";
import CartSummary from "../CartSummary";

import "./index.css";

class Cart extends Component {
  state = {
    cartList: [],
  };

  componentDidMount() {
    this.getCartList();
  }

  removeAllCartItems = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:3004/cart/all`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "DELETE",
    };
    const response = await fetch(apiUrl, options);

    if (response.ok) {
      // Rows successfully deleted, update the cartList state
      this.setState({ cartList: [] });
    } else {
      // Handle error if rows were not deleted
      console.error("Failed to delete cart items");
    }
  };

  getCartList = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:3004/cart`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    const cartList = data.cartItems;
    console.log(cartList)
    this.setState({ cartList });
  };

  render() {
    const { cartList } = this.state;

    return (
      <>
        <Header />
        <div className="cart-container">
          {cartList.length === 0 ? (
            <EmptyCartView />
          ) : (
            <div className="cart-content-container">
              <h1 className="cart-heading">My Cart</h1>
              <button
                type="button"
                className="remove-all-btn"
                onClick={this.removeAllCartItems}
              >
                Remove All
              </button>
              <CartListView cartList={cartList} />
              <CartSummary cartList={cartList} />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Cart;
