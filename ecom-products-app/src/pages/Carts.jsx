import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/carts/cartSlice";
import { useNavigate } from "react-router-dom";

import "../styles/Cart.css";

function Carts() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  // User details
  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.name;
  const userEmail = user?.email;

  // Cart totals
  const totalItems = cartItems.length;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Buy button
  const handleBuy = () => {
    navigate("/payment");
  };

  return (
    <div className="cart-container">
      {/* Header */}

      <div className="cart-header">
        <div>
          <h1>My Shopping Cart 🛒</h1>

          <p>
            Welcome back, <span>{userName}</span>
          </p>

          <small>{userEmail}</small>
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Total Items</h3>

            <p>{totalItems}</p>
          </div>

          <div className="summary-card">
            <h3>Total Amount</h3>

            <p>₹ {totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Empty Cart */}

      {cartItems.length === 0 && (
        <div className="empty-cart">
          <h2>Your cart is empty 😔</h2>

          <p>Start adding products to your cart</p>

          <button className="shop-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      )}

      {/* Cart Items */}

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-card">
            {/* Image */}

            <div className="cart-image">
              <img src={item.image} alt={item.title} />
            </div>

            {/* Content */}

            <div className="cart-content">
              <span className="cart-category">{item.category}</span>

              <h3>{item.title}</h3>

              <p className="cart-price">₹ {item.price}</p>
            </div>

            {/* Actions */}

            <div className="cart-actions">
              <button
                className="remove-btn"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout */}

      {cartItems.length > 0 && (
        <div className="checkout-section">
          <button className="checkout-btn" onClick={handleBuy}>
            Proceed To Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Carts;
