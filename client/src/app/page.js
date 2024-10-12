'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = document.getElementById('background-video');
    if (video) {
      video.muted = true; // Start muted
    }
  }, []);

  const toggleMute = () => {
    const video = document.getElementById('background-video');
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const togglePlay = () => {
    const video = document.getElementById('background-video');
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  return (
    <div className="bg-black min-h-screen">
      
      <div className="bg-black min-h-screen py-16 px-8">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    
    {/* Left Side: Text Content with Animation */}
    <div className="text-white animate-fade-in">
      <h1 className="text-5xl font-bold leading-tight mb-4">
        Easy Way To Get Your Account Funded Within 2 Minutes
      </h1>
      <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mb-6"></div>
      <p className="text-lg text-gray-300 mb-8">
        It seems like you're looking for a trusted and smart way to discover real estate properties tailored to your preferences. Here are some suggestions on how you might approach this. It seems like you're looking for a trusted and smart way to discover real estate properties tailored to your preferences.
      </p>

      {/* Buttons with Animation */}
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-600 transition animate-fade-in-up">
          Get Started
        </button>
        <button className="border border-gray-400 text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-700 transition animate-fade-in-up">
          View Offers
        </button>
      </div>
    </div>

    {/* Right Side: Swinging Credit Cards */}
    <div className="relative flex justify-center items-center">
      {/* First Card with Swinging Animation */}
      <div className="absolute transform swing-card bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg w-72 h-40 z-20">
        <div className="text-white text-lg font-semibold">Credit Card</div>
        <div className="text-white mt-4">Paras .</div>
        <div className="text-white">5241-4321-9748-4877</div>
      </div>

      {/* Second Card (Stacked Underneath) */}
      <div className="absolute transform swing-card bg-gradient-to-r from-blue-500 to-pink-600 p-6 rounded-lg shadow-lg w-72 h-40 top-8 left-8 z-10">
        <div className="text-white text-lg font-semibold">Credit Card</div>
        <div className="text-white mt-4">Satvik</div>
        <div className="text-white">5241-4321-9748-4877</div>
      </div>

      {/* Third Card (Stacked Below) */}
      <div className="absolute transform swing-card bg-gradient-to-r from-orange-500 to-purple-500 p-6 rounded-lg shadow-lg w-72 h-40 top-16 left-16 z-0">
        <div className="text-white text-lg font-semibold">Credit Card</div>
        <div className="text-white mt-4">Joko Susanto</div>
        <div className="text-white">5241-4321-9748-4877</div>
      </div>
    </div>
  </div>
</div>

      
      

      {/* Main Section with Graph and Cards */}
      <section className="mt-16 px-8 md:px-20 lg:px-40 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Graph with Multi-Color Gradient */}
          <div className="bg-[#53565c]/30 text-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in">
            <h3 className="text-xl font-bold text-white">Portfolio</h3>
            <p className="text-white-600">CIBIL Score</p>
            <Image 
              src="/graph-placeholder.png"
              alt="Graph"
              width={600}
              height={400}
              className="mx-auto rounded-lg"
            />
            
          </div>

          {/* Right Side: Cards with Multi-Color Gradient */}
          <div className="space-y-6">
            {/* Card 1 */}
            <div className="bg-[#53565c]/30 backdrop-blur-md border border-[#53565c]/20 rounded-lg shadow-lg p-8 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in">
              <p className="text-indigo-600 text-lg font-semibold">By the makers of Tailwind CSS</p>
              <h3 className="text-4xl font-bold text-gray-900 mt-2">
                Beautiful UI components, crafted with Tailwind CSS.
              </h3>
              <div className="flex items-center space-x-4 mt-4">
                {/* Icons and Text */}
                <div className="flex items-center">
                  <span className="bg-gray-100 p-2 rounded-md">🌐</span> {/* Placeholder Icon */}
                  <p className="ml-2 text-gray-600 font-semibold">HTML</p>
                </div>
                <div className="flex items-center">
                  <span className="bg-gray-100 p-2 rounded-md">⚛️</span> {/* Placeholder Icon */}
                  <p className="ml-2 text-gray-600 font-semibold">React</p>
                </div>
                <div className="flex items-center">
                  <span className="bg-gray-100 p-2 rounded-md">🔺</span> {/* Placeholder Icon */}
                  <p className="ml-2 text-gray-600 font-semibold">Vue</p>
                </div>
              </div>

              <p className="mt-6 text-gray-600">
                Over 500+ professionally designed, fully responsive, expertly crafted component examples you can drop into your Tailwind projects and customize to your heart's content.
              </p>

              <div className="flex space-x-4 mt-8">
                <a href="#" className="bg-gray-900 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700">
                  Live preview
                </a>
                <a href="#" className="bg-white text-gray-900 border border-gray-300 px-6 py-2 rounded-md font-semibold hover:bg-gray-100">
                  Documentation
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#53565c]/30 text-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in">
              <p className="text-indigo-600 text-lg font-semibold">By the makers of Tailwind CSS</p>
              <h3 className="text-4xl font-bold text-gray-900 mt-2">
                Beautiful UI components, crafted with Tailwind CSS.
              </h3>
              <div className="flex items-center space-x-4 mt-4">
                {/* Icons and Text */}
                <div className="flex items-center">
                  <span className="bg-gray-100 p-2 rounded-md">🌐</span> {/* Placeholder Icon */}
                  <p className="ml-2 text-gray-600 font-semibold">HTML</p>
                </div>
                <div className="flex items-center">
                  <span className="bg-gray-100 p-2 rounded-md">⚛️</span> {/* Placeholder Icon */}
                  <p className="ml-2 text-gray-600 font-semibold">React</p>
                </div>
                <div className="flex items-center">
                  <span className="bg-gray-100 p-2 rounded-md">🔺</span> {/* Placeholder Icon */}
                  <p className="ml-2 text-gray-600 font-semibold">Vue</p>
                </div>
              </div>

              <p className="mt-6 text-gray-600">
                Over 500+ professionally designed, fully responsive, expertly crafted component examples you can drop into your Tailwind projects and customize to your heart's content.
              </p>

              <div className="flex space-x-4 mt-8">
                <a href="#" className="bg-gray-900 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700">
                  Live preview
                </a>
                <a href="#" className="bg-white text-gray-900 border border-gray-300 px-6 py-2 rounded-md font-semibold hover:bg-gray-100">
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section with Multi-Color Gradient */}
      <section className="mt-16 px-8 md:px-20 lg:px-40 ">
        <div className="bg-[#53565c]/30 text-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in">
          <h3 className="text-3xl font-semibold text-gray-900">Advantages</h3>
          <p className="mt-4 text-gray-600 text-lg">
            Smart contracts and decentralized transactions in cloud-based GPU computing.
          </p>
        </div>
      </section>

      {/*new card with something new experiment*/}
      <div className="bg-black py-16">
  <div className="text-center text-white">
    <h2 className="text-3xl font-bold">Why Debitter?</h2>
    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
      "Debitter" can refer to a process or action aimed at reducing bitterness. This term is commonly used in the context of food and beverages, where bitterness can sometimes be undesirable.
    </p>
  </div>

  {/* Cards Section */}
  <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-8 md:px-20 lg:px-40">
    
    {/* Card 1 with Radiance and Zoom-In Effect on Hover */}
    <div className="relative group">
      <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-100 rounded-lg blur-3xl transition-opacity duration-300"></div> {/* Radiance on Hover */}
      <div className="relative bg-black p-8 rounded-lg text-center shadow-lg group-hover:shadow-2xl transition-transform duration-300 group-hover:scale-105"> {/* Zoom-in on hover */}
        <div className="flex justify-center mb-4">
          <div className="bg-orange-500 p-4 rounded-full shadow-lg">
            <img src="/path-to-your-icon-1.svg" alt="Icon 1" className="w-10 h-10" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-white">Invest In Banking</h3>
        <p className="text-gray-400 mt-4">
          Investing in a bank typically involves purchasing shares of publicly traded banks or investing in bank-related financial products like savings accounts.
        </p>
        <a href="#" className="mt-6 inline-block text-orange-400 font-semibold hover:text-orange-500">
          Get Started &rarr;
        </a>
      </div>
    </div>

    {/* Card 2 with Radiance and Zoom-In Effect on Hover */}
    <div className="relative group">
      <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-100 rounded-lg blur-3xl transition-opacity duration-300"></div> {/* Radiance on Hover */}
      <div className="relative bg-black p-8 rounded-lg text-center shadow-lg group-hover:shadow-2xl transition-transform duration-300 group-hover:scale-105"> {/* Zoom-in on hover */}
        <div className="flex justify-center mb-4">
          <div className="bg-purple-500 p-4 rounded-full shadow-lg">
            <img src="/path-to-your-icon-2.svg" alt="Icon 2" className="w-10 h-10" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-white">Platform-Banking</h3>
        <p className="text-gray-400 mt-4">
          Platform banking refers to a model where banks provide their services through digital platforms, allowing third-party developers, fintech companies.
        </p>
        <a href="#" className="mt-6 inline-block text-orange-400 font-semibold hover:text-orange-500">
          Get Started &rarr;
        </a>
      </div>
    </div>

    {/* Card 3 with Radiance and Zoom-In Effect on Hover */}
    <div className="relative group">
      <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-100 rounded-lg blur-3xl transition-opacity duration-300"></div> {/* Radiance on Hover */}
      <div className="relative bg-black p-8 rounded-lg text-center shadow-lg group-hover:shadow-2xl transition-transform duration-300 group-hover:scale-105"> {/* Zoom-in on hover */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-500 p-4 rounded-full shadow-lg">
            <img src="/path-to-your-icon-3.svg" alt="Icon 3" className="w-10 h-10" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-white">Security Banking</h3>
        <p className="text-gray-400 mt-4">
          Security in banking is a critical aspect that ensures the protection of customers’ financial assets, personal information, and the overall integrity.
        </p>
        <a href="#" className="mt-6 inline-block text-orange-400 font-semibold hover:text-orange-500">
          Get Started &rarr;
        </a>
      </div>
    </div>

  </div>
</div>






      {/* Footer */}
      <footer className="mt-16 py-8 text-center">
        <p className="text-gray-600">© 2024 Monera. All rights reserved.</p>
      </footer>
    </div>
  );
}
