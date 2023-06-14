import CartContext from "../../context/CartContext";
import Cookies from "js-cookie";
import Header from "../Header";
import EmptyCartView from "../EmptyCartView";
import CartListView from "../CartListView";
import CartSummary from "../CartSummary";

import "./index.css";

const getCartList = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:3004/cart`;
    const options = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
    };
    const response = await fetch(apiUrl, options);
    const cartList = await response.json()
    console.log(cartList)
};
getCartList()

const Cart = () => (
    <CartContext.Consumer>
        {(value) => {
            const { cartList, removeAllCartItems } = value;
            const showEmptyView = cartList.length === 0;
            const onClickRemoveAllBtn = () => {
                removeAllCartItems();
            };

            return (
                <>
                    <Header />
                    <div className="cart-container">
                        {showEmptyView ? (
                            <EmptyCartView />
                        ) : (
                                <div className="cart-content-container">
                                    <h1 className="cart-heading">My Cart</h1>
                                    <button
                                        type="button"
                                        className="remove-all-btn"
                                        onClick={onClickRemoveAllBtn}
                                    >
                                        Remove All
                </button>
                                    <CartListView />
                                    <CartSummary />
                                </div>
                            )}
                    </div>
                </>
            );
        }}
    </CartContext.Consumer>
);

export default Cart;
