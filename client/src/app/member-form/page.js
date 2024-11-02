"use client";

import { useState } from "react";
import axios from "axios";
import stateAndCities from "../utils/statesAndCities.json"; // Make sure the path is correct

export default function MemberForm() {
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL + "/predict";
  console.log(BACKEND_API_URL);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    income: "",
    profession: "",
    state: "",
    city: "",
    car_ownership: "",
    house_ownership: "",
    current_house_years: "",
    current_job_years: "",
    marital_status: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guessStatus, setGuessStatus] = useState(null); // New state for guess handling

  const totalFields = Object.keys(formData).length;
  const filledFields = Object.values(formData).filter(
    (val) => val !== ""
  ).length;
  const progress = Math.floor((filledFields / totalFields) * 100);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiData = {
      Income: Number(formData.income),
      Age: Number(formData.age),
      Experience: Number(formData.current_experience),
      CURRENT_JOB_YRS: Number(formData.current_job_years),
      CURRENT_HOUSE_YRS: Number(formData.current_house_years),
      Married_Single: formData.marital_status,
      House_Ownership: formData.house_ownership,
      Car_Ownership: formData.car_ownership,
      Profession: formData.profession,
      CITY: formData.city,
      STATE: formData.state,
    };

    try {
      const response = await axios.post(BACKEND_API_URL, apiData);
      if (response.status === 200) {
        const prediction = response.data.prediction;

        if (prediction === "YES") {
          setSubmissionStatus("success");
          setGuessStatus(null); // Clear guess status
          alert("Thank you for becoming a member! Loan Approved");
        } else if (prediction === "NO") {
          setSubmissionStatus("error");
          setGuessStatus(null); // Clear guess status
          alert("Unfortunately Loan Denied");
        } else if (prediction === "GUESS") {
          // New condition for guess
          setSubmissionStatus(null); // Clear other statuses
          setGuessStatus("guess"); // Set guess state
          alert("The prediction is uncertain. Please consult an advisor.");
        }

        // Reset form after submission
        setFormData({
          name: "",
          age: "",
          income: "",
          profession: "",
          state: "",
          city: "",
          car_ownership: "",
          house_ownership: "",
          current_house_years: "",
          current_job_years: "",
          marital_status: "",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error");
      alert("There was an error submitting your data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your name"
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
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
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
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your income"
            />
          </div>

          {/* Profession */}
          <div>
            <label htmlFor="profession" className="block text-sm font-medium">
              Profession
            </label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your Profession"
            />
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
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Select your state</option>
              {Object.keys(stateAndCities).map((state) => (
                <option key={state} value={state} className="text-black">
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              City
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Select your city</option>
              {formData.state &&
                stateAndCities[formData.state].map((city) => (
                  <option key={city} value={city} className="text-black">
                    {city}
                  </option>
                ))}
            </select>
          </div>

          {/* Car Ownership */}
          <div>
            <label
              htmlFor="car_ownership"
              className="block text-sm font-medium"
            >
              Car Ownership
            </label>
            <select
              name="car_ownership"
              value={formData.car_ownership}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Do you own a car?</option>
              <option value="yes" className="text-black">
                Yes
              </option>
              <option value="no" className="text-black">
                No
              </option>
            </select>
          </div>

          {/* House Ownership */}
          <div>
            <label
              htmlFor="house_ownership"
              className="block text-sm font-medium"
            >
              House Ownership
            </label>
            <select
              name="house_ownership"
              value={formData.house_ownership}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Select ownership status</option>
              <option value="owned" className="text-black">
                Owned
              </option>
              <option value="rented" className="text-black">
                Rented
              </option>
              <option value="norent_noown" className="text-black">
                No Rent / No Own
              </option>
            </select>
          </div>

          {/* Current House Years */}
          <div>
            <label
              htmlFor="current_house_years"
              className="block text-sm font-medium"
            >
              Current House Years
            </label>
            <input
              type="number"
              name="current_house_years"
              value={formData.current_house_years}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Years in current house"
            />
          </div>

          {/* Current Job Years */}
          <div>
            <label
              htmlFor="current_job_years"
              className="block text-sm font-medium"
            >
              Current Job Years
            </label>
            <input
              type="number"
              name="current_job_years"
              value={formData.current_job_years}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Years in current job"
            />
          </div>

          {/* Current Experience */}
          <div>
            <label
              htmlFor="current_experience"
              className="block text-sm font-medium"
            >
              Current Experience
            </label>
            <input
              type="number"
              name="current_experience"
              value={formData.current_experience}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Years in current job"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label
              htmlFor="marital_status"
              className="block text-sm font-medium"
            >
              Marital Status
            </label>
            <select
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Select your marital status</option>
              <option value="single" className="text-black">
                Single
              </option>
              <option value="married" className="text-black">
                Married
              </option>
              <option value="divorced" className="text-black">
                Divorced
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded-md ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Submission Status Messages */}
        {submissionStatus === "success" && (
          <div className="mt-4 success-message text-center animate-bounce text-green-500">
            Loan Approved! 🎉
          </div>
        )}
        {submissionStatus === "error" && (
          <div className="mt-4 error-message text-center animate-shake text-red-500">
            Loan Denied! ❌
          </div>
        )}
        {guessStatus === "guess" && (
          <div className="mt-4 guess-message text-center animate-pulse text-yellow-500">
            Prediction is uncertain! ⚠️
          </div>
        )}
      </div>
    </div>
  );
}
