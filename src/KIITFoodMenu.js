import React, { useState, useEffect } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, Clock, Home } from 'lucide-react';
import { menu } from "./menu";

export default function KIITFoodMenu() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [activeDay, setActiveDay] = useState(days[new Date().getDay()-1]);
  const [activeHostel, setActiveHostel] = useState('Hostel-10B');
  const [hostelMenus, setHostelMenus] = useState(menu);

 

  const hostels = Object.keys(hostelMenus);

  const handlePrevDay = () => {
    const currentIndex = days.indexOf(activeDay);
    const prevIndex = (currentIndex - 1 + days.length) % days.length;
    setActiveDay(days[prevIndex]);
  };

  const handleNextDay = () => {
    const currentIndex = days.indexOf(activeDay);
    const nextIndex = (currentIndex + 1) % days.length;
    setActiveDay(days[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-purple-800 p-4">
        <h1 className="text-2xl font-bold text-center">KIIT Hostel Food Menu</h1>
      </div>

      {/* Hostel Selection */}
      <div className="p-4 bg-gray-800">
        <div className="flex flex-wrap justify-center gap-2">
          {hostels.length > 0 ? hostels.map(hostel => (
            <button
              key={hostel}
              className={`px-4 py-2 rounded-full flex items-center ${
                activeHostel === hostel ? 'bg-purple-600' : 'bg-gray-700'
              }`}
              onClick={() => setActiveHostel(hostel)}
            >
              <Home size={16} className="mr-2" />
              {hostel}
            </button>
          )) : <p className="text-center text-gray-400">Loading hostels...</p>}
        </div>
      </div>

      {/* Day Selection */}
      <div className="bg-gray-900 px-4 py-3 flex items-center">
        <button onClick={handlePrevDay} className="p-2">
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex-1 overflow-x-auto hide-scrollbar">
          <div className="flex justify-center space-x-2">
            {days.map(day => (
              <button
                key={day}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeDay === day ? 'bg-purple-600' : 'bg-gray-800'
                }`}
                onClick={() => setActiveDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        
        <button onClick={handleNextDay} className="p-2">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Food Menu Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {activeHostel} • {activeDay}
        </h2>
        
        {hostelMenus[activeHostel] && hostelMenus[activeHostel][activeDay] ? (
          hostelMenus[activeHostel][activeDay].map((item) => (
            <div 
              key={item.id} 
              className="mb-4 p-4 bg-gray-800 rounded-lg border-l-4 border-purple-500"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-gray-400">{item.location}</p>
                </div>
                <div className="bg-purple-900 text-green-300 px-3 py-1 rounded-lg text-sm flex items-center">
                  <Clock size={14} className="mr-1" />
                  {item.time}
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-700">
                <h3 className="text-gray-300 font-medium mb-1">Menu Items:</h3>
                <p className="text-white">{item.items}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No menu available for {activeDay}.</p>
        )}
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
