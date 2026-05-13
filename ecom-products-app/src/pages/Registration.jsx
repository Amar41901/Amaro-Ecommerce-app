import { useState } from 'react';
import '../styles/Form.css';
import { useNavigate } from 'react-router-dom';

function Registration() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateData = (data) => {

        const errors = {};

        // Name validation
        if (data.name.trim() === '') {
            errors.name = 'Name is required';
        }

        // Email validation
        if (data.email.trim() === '') {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(data.email)) {
            errors.email = 'Invalid email format';
        }

        // Password validation
        if (data.password.trim() === '') {
            errors.password = 'Password is required';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        // Confirm password validation
        if (data.confirmPassword.trim() === '') {
            errors.confirmPassword = 'Confirm password is required';
        } else if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const newErrors = validateData(formData);

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            console.log('Validated Registration Data:', formData);

            // Backend API integration will come next
            alert('Validation successful');

            handleReset();

            navigate('/login');

        } else {

            console.log('Validation Errors:', newErrors);

        }
    };

    const handleReset = () => {

        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

        setErrors({});
    };

    return (
        <div className='form-div'>

            <form onSubmit={handleSubmit} onReset={handleReset}>

                {/* Name */}

                <div className='field'>
                    <label htmlFor="name">Name:-</label>

                    <input
                        type="text"
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                {errors.name && (
                    <span className='error-msg'>{errors.name}</span>
                )}

                {/* Email */}

                <div className='field'>
                    <label htmlFor="email">Email:-</label>

                    <input
                        type="email"
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                {errors.email && (
                    <span className='error-msg'>{errors.email}</span>
                )}

                {/* Password */}

                <div className='field'>
                    <label htmlFor="password">Password:-</label>

                    <input
                        type="password"
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                {errors.password && (
                    <span className='error-msg'>{errors.password}</span>
                )}

                {/* Confirm Password */}

                <div className='field'>
                    <label htmlFor="confirmPassword">
                        Confirm Password:-
                    </label>

                    <input
                        type="password"
                        id='confirmPassword'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                {errors.confirmPassword && (
                    <span className='error-msg'>
                        {errors.confirmPassword}
                    </span>
                )}

                {/* Buttons */}

                <div className='buttons'>
                    <button id='reset' type='reset'>
                        Reset
                    </button>

                    <button type='submit'>
                        Register
                    </button>
                </div>

            </form>

        </div>
    );
}

export default Registration;