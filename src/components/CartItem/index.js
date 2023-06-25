import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import Cookies from "js-cookie";
import "./index.css";

const CartItem = (props) => {
  const { cartItemDetails } = props;
  const { id, title, brand, quantity, price, imageUrl } = cartItemDetails;
  console.log(quantity,price)
  const totalPrice = price * quantity;

  const onRemoveCartItem = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:3004/cart/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "DELETE",
    };
    const response = await fetch(apiUrl, options);
    console.log(response)
    // Handle response or any necessary actions after removing cart item
  };

  const onClickIncrement = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:3004/cart/add/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "PUT",
    };
    const response = await fetch(apiUrl, options);
    console.log(response)
    // Handle response or any necessary actions after incrementing cart item quantity
  };

  const onClickDecrement = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:3004/cart/subtract/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "PUT",
    };
    const response = await fetch(apiUrl, options);
    console.log(response)
    // Handle response or any necessary actions after decrementing cart item quantity
  };


  return (
    <li className="cart-item">
      <img className="cart-product-image" src={imageUrl} alt={title} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{title}</p>
          <p className="cart-product-brand">by {brand}</p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            onClick={() => onClickDecrement(id)}
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            onClick={() => onClickIncrement(id)}
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {totalPrice}/-</p>
          <button
            className="remove-button"
            type="button"
            onClick={() => onRemoveCartItem(id)}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={() => onRemoveCartItem(id)}
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  );
};

export default CartItem;
