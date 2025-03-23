import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("💰");
  const [showIconPicker, setShowIconPicker] = useState(false);

  const icons = ["💰", "💼", "💻", "🏢", "🎨", "📚", "🎵", "🎮", "📱", "✏️"];

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 pt-20">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Income Overview
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Track your earnings over time and analyze your income trends.
                </p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center px-4 py-2 bg-[#0e3b8f] text-white rounded-lg hover:bg-[#031b3a] transition-colors duration-200 ease-in-out"
              >
                <span className="mr-1 text-lg font-medium">+</span>
                Add Income
              </button>
            </div>

            {showForm && (
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Add Income
                  </h3>
                  <button
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">{selectedIcon}</span>
                    <span className="text-sm text-gray-600">Change Icon</span>
                  </button>
                </div>

                {showIconPicker && (
                  <div className="mb-4 p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-5 gap-2">
                      {icons.map((icon, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedIcon(icon);
                            setShowIconPicker(false);
                          }}
                          className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <form className="mt-3" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="block text-gray-600 text-sm mb-1">
                      Income Source
                    </label>
                    <input
                      type="text"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Enter income source"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-600 text-sm mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Enter income amount"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-600 text-sm mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="mm/dd/yyyy"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setShowIconPicker(false);
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
