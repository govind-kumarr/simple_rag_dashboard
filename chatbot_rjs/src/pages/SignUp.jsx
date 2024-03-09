import React, { useState } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  function handleCheckBox() {
    setIsChecked(!isChecked);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      toast.error('Please agree to the Terms & Conditions before submitting');
      return;
    }
    try {
      const res = await axios.post(`${baseUrl}/auth/register`, formData);
      toast.success(res.data.details);
    } catch (error) {
      toast.error('something went wrong');
      console.log('something went wrong', error);
    }
    setFormData({
      username: '',
      password: '',
    });
    setIsLoading(true);
    // navigate('/dashboard');
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
          <h1 className='text-center text-3xl font-bold'>
            Create Free Account
          </h1>
          <p className='text-center mt-4'>No credit card required</p>
          <div className='w-full mt-7'>
            <input
              className='w-full rounded-md border-2 border-[#C5CDD8] py-5 px-7 mt-5'
              placeholder='UserName'
              type='username'
              name='username'
              value={formData?.username}
              onChange={handleChange}
            />
            <input
              className='w-full rounded-md border-2 border-[#C5CDD8] py-5 px-7 mt-5'
              placeholder='Password'
              type='password'
              name='password'
              value={formData?.password}
              onChange={handleChange}
            />
            {/* <input
              className='w-full rounded-md border-2 border-[#C5CDD8] py-5 px-7 mt-5'
              placeholder='Website'
              type='text'
              name='website'
              value={formData?.website}
              onChange={handleChange}
            /> */}
          </div>
          <div className='flex items-center mt-5'>
            <input
              type='checkbox'
              className='w-4 h-4 rounded-2xl'
              onChange={handleCheckBox}
            />
            <label className='ml-3'>
              I agree to the{' '}
              <span className='text-primary font-semibold'>
                Terms & Conditions
              </span>{' '}
              and{' '}
              <span className='text-primary font-semibold'>Privacy Policy</span>
            </label>
          </div>
          <button
            onClick={onSubmit}
            className='w-full bg-primary rounded-md text-white font-semibold p-5 mt-5'
            disabled={isLoading}
          >
            {isLoading ? 'loading...' : 'Get Started For Free'}
          </button>
          <div className='mt-5'>
            Do have an account?
            <span
              onClick={() => navigate('/')}
              className='font-bold text-primary cursor-pointer ml-1 '
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
