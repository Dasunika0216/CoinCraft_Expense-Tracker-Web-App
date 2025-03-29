import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const Budget = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [icon, setIcon] = useState("💰");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [budget, setBudget] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const icons = ["💰", "🛍️", "🏠", "🚗", "🌳", "📱", "✈️", "🎮", "📚", "🍽️"];

  const fetchBudget = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/list-budget",
        {},
        { headers: { token: localStorage.getItem("token") } }
      );

      if (response.data.success) {
        setBudgets(response.data.data);
        // console.log(response.data.data);
      }
    } catch (error) {
      console.log("Error in fetching budget", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/list-all-expense",
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response.data.data);

      if (response.data.success) {
        setExpenses(response.data.data);
      }
    } catch (error) {
      console.log("Error in fetching expenses", error);
    }
  };

  useEffect(() => {
    fetchBudget();
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/add-budget",
        { icon, name: budget, allocatedAmount: amount },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response.data);

      if (response.data.success) {
        setShowForm(false);
        setIcon("💰");
        setShowIconPicker(false);
        setBudget("");
        setAmount("");
        fetchBudget();
      }
    } catch (error) {
      console.log("Error in adding budget", error);
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/delete-expense",
        { expenseId },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response.data);

      if (response.data.success) {
        setShowDeleteConfirm(false);
        fetchExpenses();
      }
    } catch (error) {
      console.log("Error in deleting expense", error);
    }
  };

  const chartData = {
    labels: [...expenses]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 20)
      .map((expense) =>
        new Date(expense.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      ),
    datasets: [
      {
        label: "Expense Amount ($)",
        data: [...expenses]
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 20)
          .map((expense) => expense.amount),
        backgroundColor: "rgba(14, 59, 143, 0.8)",
        borderColor: "rgba(14, 59, 143, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount ($)",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="w-full max-w-5xl mx-auto space-y-8">
          {/* Budgets Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Set Your Budget
            </h1>

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
                const spentAmount =
                  budget.expenses?.reduce(
                    (total, expense) => total + expense.amount,
                    0
                  ) || 0;
                const progress = (spentAmount / budget.allocatedAmount) * 100;

                return (
                  <div
                    key={budget._id}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                    onClick={() =>
                      navigate("/expense", { state: { budgetId: budget._id } })
                    }
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">
                          {budget.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {budget.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {
                              expenses.filter(
                                (expense) => expense.budgetId === budget._id
                              ).length
                            }{" "}
                            Item
                            {expenses.filter(
                              (expense) => expense.budgetId === budget._id
                            ).length !== 1
                              ? "s"
                              : ""}
                          </p>
                        </div>
                      </div>
                      <span className="text-indigo-600 font-semibold">
                        ${budget.allocatedAmount}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>
                          $
                          {expenses
                            .filter(
                              (expense) => expense.budgetId === budget._id
                            )
                            .reduce(
                              (total, expense) =>
                                total + parseFloat(expense.amount || 0),
                              0
                            )}{" "}
                          Spent
                        </span>
                        <span>
                          $
                          {Math.round(
                            budget.allocatedAmount -
                              expenses
                                .filter(
                                  (expense) => expense.budgetId === budget._id
                                )
                                .reduce(
                                  (total, expense) =>
                                    total + parseFloat(expense.amount || 0),
                                  0
                                )
                          )}{" "}
                          Remaining
                        </span>
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

            {/* Expense Chart */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <Line options={chartOptions} data={chartData} />
            </div>
          </div>

          {/* All Expenses Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">
              Recent Expenses
            </h1>
            <p className="text-gray-600 mt-2 mb-6">
              Your latest expense entries
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="bg-white p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                        {expense.icon || "💰"}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {expense.name}
                        </h3>
                        <p className="text-gray-500">
                          {new Date(expense.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-semibold text-red-500">
                        - ${expense.amount}
                      </span>
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(true);
                            setDeleteId(expense._id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {expenses.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  No expenses found. Start adding expenses to track your
                  spending.
                </div>
              )}
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Confirm Delete
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this income entry? This action
                  cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteId(null);
                    }}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteId)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Budget Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Create New Budget
                </h2>
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
