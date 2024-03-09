import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';
import axios from 'axios';
import { baseUrl } from '../App';
import { toast } from 'react-toastify';
// import logo from '../assets/logo/logo.svg';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData', formData);
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, formData);
      toast.success(res.data.details);
    } catch (error) {
      toast.error('something went wrong');
      console.log('something went wrong', error);
    }
    setFormData({
      username: '',
      password: '',
    });
    // navigate('/dashboard');
  };

  return (
    <div className='flex flex-col md:flex-row md:max-w-screen md:h-screen overflow-hidden text-black'>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center relative bg-bgColor pb-20 pt-32 md:pt-16 lg:pt-0'>
        <div className='w-[80%] md:w-[63%]'>
          <h1 className='leading-[1.3] text-2xl font-semibold'>
            Have Better Conversations with Customers, Build Trust, and actively
            drive more Sales.
          </h1>
          <p className='text-[#6F7277] leading-[1.3] text-sm pr-10 my-5'>
            Maximize KPI results with an Advanced human-level AI requiring zero
            Human Intervention
          </p>
          <div className='w-[90%] flex flex-col'>
            <div className='flex'>
              <div className='mt-0.5'>
                <FaCircleCheck size={20} className='text-primary' />
              </div>
              <p className='leading-[1.3] text-sm pl-3'>
                Operates as an experienced Salesperson manager for your Business
                with a primary goal of Guiding Customers through the Buying
                Journey 24/7 to improve sales.
              </p>
            </div>
            <div className='flex pt-5'>
              <div className='mt-0.5'>
                <FaCircleCheck size={20} className='text-primary' />
              </div>
              <p className='leading-[1.3] text-sm pl-3'>
                Solve 99% of Customer Queries while personalizing every
                interactions.
              </p>
            </div>
            <div className='flex pt-5'>
              <div className='mt-0.5'>
                <FaCircleCheck size={20} className='text-primary' />
              </div>
              <p className='leading-[1.3] text-sm pl-3'>
                Eliminates the need for a Human Agent and cancels the Cost and
                Wasted Time Associated with hiring.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/2 flex justify-center items-center py-16 md:py-0'>
        <div className='w-[80%] md:w-[70%] flex flex-col justify-center'>
          <h1 className='text-center text-3xl font-bold'>Sign In</h1>
          <div className='w-full mt-7'>
            <input
              className='w-full rounded-md border-2 border-[#C5CDD8] py-5 px-7 mt-5'
              placeholder='UserName'
              type='username'
              name='username'
              value={formData.username}
              onChange={handleChange}
            />
            <input
              className='w-full rounded-md border-2 border-[#C5CDD8] py-5 px-7 mt-5'
              placeholder='Password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type='submit'
            onClick={handleSubmit}
            className='w-full bg-primary rounded-md text-white font-semibold p-5 mt-5'
          >
            Sign In
          </button>
          <div className='mt-5'>
            Don't have account?
            <span
              onClick={() => navigate('/signUp')}
              className='font-bold text-primary cursor-pointer ml-1'
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
