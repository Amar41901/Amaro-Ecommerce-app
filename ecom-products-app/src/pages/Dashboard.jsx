import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { addToCart } from "../features/carts/cartSlice";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { items, status, error } = useSelector((state) => state.products);

  // Stored user
  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.name;
  const userEmail = user?.email;
  const userRole = user?.role;

  // UI states
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Categories
  const categories = useMemo(() => {
    return ["all", ...new Set(items.map((item) => item.category))];
  }, [items]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    let products = [...items];

    // Search
    if (searchTerm.trim() !== "") {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Category
    if (category !== "all") {
      products = products.filter((product) => product.category === category);
    }

    // Sorting
    if (sortBy === "priceLowHigh") {
      products.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "priceHighLow") {
      products.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "titleAZ") {
      products.sort((a, b) => a.title.localeCompare(b.title));
    }

    return products;
  }, [items, searchTerm, category, sortBy]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // Loading
  if (status === "loading") {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <h2>Loading Products...</h2>
      </div>
    );
  }

  // Error
  if (status === "failed") {
    return <h2 className="error-text">{error}</h2>;
  }

  return (
    <div className="dashboard-container">
      {/* Header */}

      <div className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">{userName?.charAt(0)}</div>

          <div>
            <h1>Welcome Back, {userName} 👋</h1>

            <p>{userEmail}</p>

            <span className="role-badge">{userRole}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Title */}

      <div className="dashboard-top">
        <h2>Discover Amazing Products</h2>

        <p>Explore modern fashion, electronics and more</p>
      </div>

      {/* Filters */}

      <div className="filters-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>

          <option value="priceLowHigh">Price: Low → High</option>

          <option value="priceHighLow">Price: High → Low</option>

          <option value="titleAZ">Title: A → Z</option>
        </select>
      </div>

      {/* Products */}

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p className="empty-text">No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.title} />
              </div>

              <div className="product-content">
                <p className="product-category">{product.category}</p>

                <h4>{product.title}</h4>

                <div className="product-bottom">
                  <p className="product-price">₹ {product.price}</p>

                  <button
                    className="cart-btn"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
