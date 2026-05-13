import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/carts/cartSlice";
import { useNavigate } from "react-router-dom";

function Carts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const userEmail = localStorage.getItem("userEmail");

  const totalItems = cartItems.length;
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const handleBuy = () => {
    navigate("/payment");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Cart</h1>
      <p>User: <strong>{userEmail}</strong></p>

      <h3>Total Items: {totalItems}</h3>
      <h3>Total Amount: ₹ {totalAmount.toFixed(2)}</h3>

      {cartItems.length === 0 && <h2>No items in cart</h2>}

      {cartItems.map((item) => (
        <div key={item.id} style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
          <img src={item.image} alt={item.title} height="80" />
          <div style={{ flex: 1 }}>
            <h4>{item.title}</h4>
            <p>₹ {item.price}</p>
          </div>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <button onClick={handleBuy} style={{ marginTop: "20px" }}>
          Buy Items
        </button>
      )}
    </div>
  );
}

export default Carts;
