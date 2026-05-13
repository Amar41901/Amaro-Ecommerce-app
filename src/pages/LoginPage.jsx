import React, { useState } from 'react';
import '../styles/Form.css'
import { Link, useNavigate } from 'react-router';

function LoginPage(props) {
    const [formData, setFormData]  = useState({
            email:'',
            password:'',
        });
    
        const [errors, setErrors] = useState({});

        const navigate = useNavigate();

        //get dat from local storage:
        const userPassword = localStorage.getItem('user-password');
        const emailData = localStorage.getItem('user-email');

        const handleChange = (e)=>{
            const {name, value} = e.target;
            setFormData({
                ...formData,
                [name]:value
            })
        }
    
        const handleSubmit = (e) =>{
            e.preventDefault();
            const newErrors = validateData(formData);
            setErrors(newErrors);
              if(Object.keys(newErrors).length === 0){
                alert("Form submitted successfully!!!");
                console.log("Form data received: ", formData);
                handleReset();
                navigate('/')
                }else{
                    alert("Errors occured while form submission!!");
                    console.log("Errors occured: ", newErrors);
                }   
        }
    
        const handleReset = ()=>{
            setFormData({
                email:'',
                password:'',
            });
            setErrors({})
        }
    
        const validateData = (data) =>{
            const errors = {};
    
            if(data.email.trim()===''){
                errors.email = 'Email is required';
            }else if(data.email !== emailData){
                errors.email = 'Not a registered email';
            }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(data.email)){
                errors.email = 'Invalid format';
            }
    
            if(data.password.trim()===''){
                errors.password = 'password is required';
            } else if(data.password !== userPassword){
                errors.password = 'Invalid password';
            }
            return errors;
        }

    return (
         <div className='form-div'>
            <form action="" onSubmit={handleSubmit} onReset={handleReset}>
                <div className='field'>
                    <label htmlFor="email">Email:-</label>
                    <input type="email" 
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                {errors.email && (<span className='error-msg'>{errors.email}</span>)}

                <div className='field'>
                    <label htmlFor="password">Password:-</label>
                    <input type="password" 
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                {errors.password && (<span className='error-msg'>{errors.password}</span>)}
              
                <div className='buttons'>
                    <button type='submit'>Login In</button>
                </div>
                {errors.email === 'Not a registered email' &&
                 <h3>Click here to get registered!! <Link to='/signin'>register</Link></h3>}
            </form>
        </div>
    );
}

export default LoginPage;