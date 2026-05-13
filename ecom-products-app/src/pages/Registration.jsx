import { useState } from "react";
import "../styles/Form.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Name validation
    if (data.name.trim() === "") {
      errors.name = "Name is required";
    }

    // Email validation
    if (data.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(data.email)) {
      errors.email = "Invalid email format";
    }

    // Password validation
    if (data.password.trim() === "") {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Confirm Password validation
    if (data.confirmPassword.trim() === "") {
      errors.confirmPassword = "Confirm password is required";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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
          "http://localhost:5000/api/auth/register",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          },
        );

        localStorage.setItem("token", response.data.token);

        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Registration successful");

        handleReset();

        navigate("/login");
      } catch (error) {
        console.log(error);

        alert(error?.response?.data?.message || "Registration failed");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setErrors({});
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account 🚀</h1>

          <p>Register to explore amazing products</p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          {/* Name */}

          <div className="field">
            <label htmlFor="name">Full Name</label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {errors.name && <span className="error-msg">{errors.name}</span>}

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
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {errors.password && (
            <span className="error-msg">{errors.password}</span>
          )}

          {/* Confirm Password */}

          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {errors.confirmPassword && (
            <span className="error-msg">{errors.confirmPassword}</span>
          )}

          {/* Buttons */}

          <div className="buttons">
            <button className="secondary-btn" id="reset" type="reset">
              Reset
            </button>

            <button className="primary-btn" type="submit">
              Register
            </button>
          </div>

          {/* Footer */}

          <div className="auth-footer">
            <p>
              Already have an account?
              <Link to="/login">Login Here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
