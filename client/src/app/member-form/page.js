'use client';

import { useState, useEffect } from 'react';

export default function MemberForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    income: '',
    profession: '',
    state: '',
    car_ownership: '',
    house_ownership: '',
  });

  const totalFields = Object.keys(formData).length;
  const filledFields = Object.values(formData).filter((val) => val !== '').length;
  const progress = Math.floor((filledFields / totalFields) * 100);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Thank you for becoming a member!');
  };

  return (
    <div className="min-h-screen bg-black-900 text-white py-10 px-4 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-black p-8 rounded-lg shadow-lg">
        {/* Progress Bar */}
        <div className="relative w-full h-4 bg-black rounded-full mb-6">
          <div
            className="absolute top-0 left-0 h-4 bg-blue-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">Become a Member</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm-black font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
            />
          </div>

          {/* Income */}
          <div>
            <label htmlFor="income" className="block text-sm font-medium">
              Income
            </label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your income"
            />
          </div>

          {/* Profession */}
          <div>
            <label htmlFor="profession" className="block text-sm font-medium">
              Profession
            </label>
            <select
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your profession</option>
              <option value="Software_Developer">Software Developer</option>
              <option value="Engineer">Engineer</option>
              <option value="Doctor">Doctor</option>
              <option value="Artist">Artist</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium">
              State
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your state</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Delhi">Delhi</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>

          {/* Car Ownership */}
          <div>
            <label htmlFor="car_ownership" className="block text-sm font-medium">
              Car Ownership
            </label>
            <select
              name="car_ownership"
              value={formData.car_ownership}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Do you own a car?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* House Ownership */}
          <div>
            <label htmlFor="house_ownership" className="block text-sm font-medium">
              House Ownership
            </label>
            <select
              name="house_ownership"
              value={formData.house_ownership}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select ownership status</option>
              <option value="owned">Owned</option>
              <option value="rented">Rented</option>
              <option value="norent_noown">No Rent / No Own</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
