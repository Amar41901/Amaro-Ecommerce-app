import { useState } from "react";
import "../styles/Form.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateData = (data) => {
    const errors = {};

    if (data.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(data.email)) {
      errors.email = "Invalid email format";
    }

    if (data.password.trim() === "") {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateData(formData);

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          },
        );

        localStorage.setItem("token", response.data.token);

        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Login successful");

        handleReset();

        navigate("/");
      } catch (error) {
        console.log(error);

        alert(error?.response?.data?.message || "Login failed");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
    });

    setErrors({});
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back 👋</h1>

          <p>Login to continue shopping</p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          {/* Email */}

          <div className="field">
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {errors.email && <span className="error-msg">{errors.email}</span>}

          {/* Password */}

          <div className="field">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {errors.password && (
            <span className="error-msg">{errors.password}</span>
          )}

          {/* Buttons */}

          <div className="buttons">
            <button className="primary-btn" type="submit">
              Login
            </button>
          </div>

          <div className="auth-footer">
            <p>
              New user?
              <Link to="/signin">Register Here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
