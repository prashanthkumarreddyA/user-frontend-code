import CartItem from "../CartItem";
import "./index.css";

const CartListView = ({ cartList }) => (
  <ul className="cart-list">
    {cartList.map((eachCartItem) => (
      <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
    ))}
  </ul>
);

export default CartListView;
