import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Expense = () => {
  const [showForm, setShowForm] = useState(false);
  const [icon, setIcon] = useState("💰");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [budget, setBudget] = useState("");
  const [amount, setAmount] = useState("");

  const icons = ["💰", "🛍️", "🏠", "🚗", "🌳", "📱", "✈️", "🎮", "📚", "🍽️"];

  const fetchBudget = async () => {

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/dashboard/add-budget', {icon, name: budget, allocatedAmount:amount}, {headers: {token: localStorage.getItem("token")}});
      console.log(response.data);

      if (response.data.success) {
        setShowForm(false);
        setIcon("💰");
        setShowIconPicker(false);
        setBudget("");
        setAmount("");
        fetchBudget();
      }

    } 
    catch (error) {
      
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="w-full max-w-5xl mx-auto space-y-8">
          {/* Expense Overview Box */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex flex-col mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Expense Overview
              </h1>
              <p className="text-gray-600 mt-2">
                Track your spending trends over time and gain insights into
                where your money goes.
              </p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6">My Budgets</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Budget Card */}
            <button 
              onClick={() => setShowForm(true)}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center min-h-[200px] hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <span className="text-gray-600 font-medium">
                Create New Budget
              </span>
            </button>
          </div>

          {/* Add Budget Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Budget</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Icon Picker */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose Icon
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowIconPicker(!showIconPicker)}
                        className="w-full px-4 py-2 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <span className="text-2xl">{icon}</span>
                      </button>
                      {showIconPicker && (
                        <div className="absolute top-full left-0 mt-2 p-2 bg-white border rounded-lg shadow-lg grid grid-cols-5 gap-2">
                          {icons.map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => {
                                setIcon(emoji);
                                setShowIconPicker(false);
                              }}
                              className="text-2xl p-2 hover:bg-gray-100 rounded"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Budget Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Name
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="Enter Budget Name"
                    />
                  </div>

                  {/* Budget Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Amount
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="Enter Budget Amount"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Budget
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setIcon("💰");
                        setBudget("");
                        setAmount("");
                      }}
                      className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Expense;
