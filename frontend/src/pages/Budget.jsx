import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Budget = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [icon, setIcon] = useState("💰");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [budget, setBudget] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]);

  const icons = ["💰", "🛍️", "🏠", "🚗", "🌳", "📱", "✈️", "🎮", "📚", "🍽️"];

  const fetchBudget = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/dashboard/list-budget', {}, {headers: {token: localStorage.getItem("token")}});
    
      if (response.data.success) {
        setBudgets(response.data.data);
      }
    } 
    catch (error) {
      console.log("Error in fetching budget", error);
    }
  }

  useEffect(() => {
    fetchBudget();
  }, []);

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
      console.log("Error in adding budget", error);
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

          {/* Budgets Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Set Your Budget</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Create New Budget Card */}
              <button 
                onClick={() => setShowForm(true)}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200 flex flex-col items-center justify-center min-h-[200px] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
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

              {/* Budget Cards */}
              {budgets.map((budget) => {
                const remainingAmount = budget.allocatedAmount - budget.spentAmount;
                const progress = (budget.spentAmount / budget.allocatedAmount) * 100;
                
                return (
                  <div 
                    key={budget._id} 
                    className="bg-gray-50 p-6 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                    onClick={() => navigate('/expense', { state: { budgetId: budget._id } })}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">
                          {budget.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{budget.name}</h3>
                          <p className="text-sm text-gray-500">{budget.itemCount} Item{budget.itemCount !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <span className="text-indigo-600 font-semibold">${budget.allocatedAmount}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${budget.spentAmount} Spent</span>
                        <span>${remainingAmount} Remaining</span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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

export default Budget;
