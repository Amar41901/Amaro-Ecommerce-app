import React, { useState } from 'react';
import '../styles/Form.css';
import {useNavigate} from 'react-router'

function Registration(props) {
    const [formData, setFormData]  = useState({
        email:'',
        password:'',
        role:''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
            alert("Form submitted successfully!!!", formData.role);
            console.log("Form data received: ", formData);

            //day 2
            localStorage.setItem('user-email',formData.email);
            localStorage.setItem('user-password',formData.password);
            localStorage.setItem('user-role',formData.role);
            handleReset();
            navigate('/login');
            
            }else{
                alert("Errors occured while form submission!!");
                console.log("Errors occured: ", newErrors);
            }   
    }

  

    const handleReset = ()=>{
        setFormData({
            email:'',
            password:'',
            role:''
        });
        setErrors({})
    }

    const validateData = (data) =>{
        const errors = {};

        if(data.email.trim()===''){
            errors.email = 'Email is required';
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(data.email)){
            errors.email = 'Invalid format';
        }

        if(data.password.trim()===''){
            errors.password = 'password is required';
        } else if(data.password.length < 6){
             errors.password = 'password must be atleast 6 chars long';
        }

        if(data.role.trim()===''){
            errors.role = 'role is required';
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
                <div className='field'>
                    <label htmlFor="role">Role:-</label>
                    <input type="role" 
                        id='role'
                        name='role'
                        value={formData.role}
                        onChange={handleChange}
                    />
                </div>
                {errors.role && (<span className='error-msg'>{errors.role}</span>)}
                <div className='buttons'>
                    <button id='reset' type='reset'>Reset</button>
                    <button type='submit'>Sign In</button>
                </div>
            </form>
        </div>
    );
}

export default Registration;