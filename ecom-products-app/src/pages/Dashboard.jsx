
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { addToCart } from "../features/carts/cartSlice";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router";


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(
    (state) => state.products
  );

  const userEmail = localStorage.getItem("user-email");

  // 🔹 UI states
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔹 Categories
  const categories = useMemo(() => {
    return ["all", ...new Set(items.map(item => item.category))];
  }, [items]);

  // 🔹 Filter + Search + Sort
  const filteredProducts = useMemo(() => {
    let products = [...items];

    // 🔍 Search by title
    if (searchTerm.trim() !== "") {
      products = products.filter(product =>
        product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // 📂 Filter by category
    if (category !== "all") {
      products = products.filter(
        product => product.category === category
      );
    }

    // 🔃 Sorting
    if (sortBy === "priceLowHigh") {
      products.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "priceHighLow") {
      products.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "titleAZ") {
      products.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return products;
  }, [items, searchTerm, category, sortBy]);

  if (status === "loading") return <h2>Loading products...</h2>;
  if (status === "failed") return <h2>{error}</h2>;

  return (
  <div className="dashboard">
    <div className="user-div">
        <h1>Welcome, {userEmail} 🙋‍♂️✌️</h1>
        <button onClick={()=>{localStorage.clear();navigate('/signin')}}>Log out</button>
    </div>
    <h2>Products</h2>

    {/* 🔍 Filters */}
    <div className="filters">
      <input
        type="text"
        placeholder="Search by product title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map(cat => (
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

    {/* 📦 Products */}
    <div className="products-grid">
      {filteredProducts.length === 0 ? (
        <p className="empty-text">No products found.</p>
      ) : (
        filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>₹ {product.price}</p>
            <p style={{ fontSize: "12px" }}>{product.category}</p>

            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);
}

export default Dashboard;
