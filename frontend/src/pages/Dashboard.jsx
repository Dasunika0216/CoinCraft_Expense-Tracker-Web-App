import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [recentIncomes, setRecentIncomes] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);

  const fetchTotalIncome = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/total-income",
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      // console.log(response.data);

      if (response.data.success) {
        setTotalIncome(response.data.data[0].totalIncome);
      }
    } catch (error) {
      console.error("Error fetching total income:", error);
    }
  };

  const fetchTotalExpenses = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/total-expense",
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      // console.log(response.data);

      if (response.data.success) {
        setTotalExpense(response.data.data[0].totalExpense);
      }
    } catch (error) {
      console.error("Error fetching total income:", error);
    }
  };

  const fetchRecentIncomes = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/list-income",
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      // console.log(response.data);

      if (response.data.success) {
        setRecentIncomes(response.data.data.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching recent incomes:", error);
    }
  };

  const fetchRecentExpenses = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/dashboard/list-all-expense",{},{ headers: { token: localStorage.getItem("token")}});
      console.log(response.data);

      if (response.data.success) {
        setRecentExpenses(response.data.data.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching recent incomes:", error);
    }
  };

  useEffect(() => {
    fetchTotalIncome();
    fetchTotalExpenses();
    fetchRecentIncomes();
    fetchRecentExpenses();
  }, []);

  const totalBalance = Math.max(0, totalIncome - totalExpense);

  // Data for the Doughnut Chart
  const chartData = {
    labels: ["Total Balance", "Total Expenses", "Total Income"],
    datasets: [
      {
        data: [totalBalance, totalExpense, totalIncome],
        backgroundColor: ["#7e3af2", "#f05252", "#f97316"], // Colors for each section
        hoverBackgroundColor: ["#6b21a8", "#dc2626", "#ea580c"], // Hover colors
        borderWidth: 1,
      },
    ],
  };

  // Data for the Doughnut Chart
  const incomeChartData = {
    labels: recentIncomes.map((income) => income.source), // Use income sources as labels
    datasets: [
      {
        data: recentIncomes.map((income) => income.amount), // Use income amounts as data
        backgroundColor: [
          "#7e3af2",
          "#f05252",
          "#f97316",
          "#10b981",
          "#3b82f6",
        ], // Colors for each section
        hoverBackgroundColor: [
          "#6b21a8",
          "#dc2626",
          "#ea580c",
          "#059669",
          "#2563eb",
        ], // Hover colors
        borderWidth: 1,
      },
    ],
  };

  const incomeChartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#4b5563", // Text color
          font: {
            size: 14,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const expenseChartData = {
    labels: recentExpenses.map((expense) => expense.name), // Use expense sources as labels
    datasets: [
      {
        data: recentExpenses.map((expense) => expense.amount), // Use expense amounts as data
        backgroundColor: [
          "#f05252",
          "#f97316",
          "#10b981",
          "#3b82f6",
          "#7e3af2",
        ], // Colors for each section
        hoverBackgroundColor: [
          "#dc2626",
          "#ea580c",
          "#059669",
          "#2563eb",
          "#6b21a8",
        ], // Hover colors
        borderWidth: 1,
      },
    ],
  };

  const expenseChartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#4b5563", // Text color
          font: {
            size: 14,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#4b5563", // Text color
          font: {
            size: 14,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar />
      <div className="flex justify-center pt-20 min-h-screen">
        <div className="w-full max-w-6xl">
          {/* Warning Message */}
          {totalIncome < totalExpense && (
            <div className="text-center mb-6">
              <p className="text-red-500 text-lg font-bold animate-pulse border-2 border-red-500 rounded-lg p-4 shadow-lg bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white">
                Warning! Be mindful about your expenses!
              </p>
            </div>
          )}

          <div className="flex justify-between gap-6 mt-5">
            {/* Total Income Card */}
            <div className="bg-gradient-to-b from-[#0b0259] to-indigo-900 shadow-2xl rounded-xl p-8 flex-1 text-center transform transition duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="text-orange-300 text-2xl font-semibold mb-3">
                Total Income
              </div>
              <div className="text-4xl text-white">${totalIncome}</div>
            </div>

            {/* Total Expenses Card */}
            <div className="bg-gradient-to-b from-[#0b0259] to-indigo-900 shadow-2xl rounded-xl p-8 flex-1 text-center transform transition duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="text-red-300 text-2xl font-semibold mb-3">
                Total Expenses
              </div>
              <div className="text-4xl text-white">${totalExpense}</div>
            </div>

            {/* Total Balance Card */}
            <div className="bg-gradient-to-b from-[#0b0259] to-indigo-900 shadow-2xl rounded-xl p-8 flex-1 text-center transform transition duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="text-purple-300 text-2xl font-semibold mb-3">
                Total Balance
              </div>
              <div className="text-4xl text-white">
                ${Math.max(0, totalIncome - totalExpense)}
              </div>
            </div>
          </div>

          {/* Financial Overview Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg mb-10 mt-10 border-2 border-gray-200 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Financial Overview
            </h2>
            <div className="flex justify-center">
              <div className="w-80 h-80">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
            {/* Recent Incomes Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 flex flex-col h-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Income Sources
                </h2>
                <button
                  className="px-3 py-1 bg-indigo-100 text-indigo-600 font-medium rounded-lg hover:bg-indigo-200 hover:text-indigo-700 transition-all duration-300 shadow-md"
                  onClick={() => (window.location.href = "/income")}
                >
                  See All
                </button>
              </div>
              <div className="space-y-3">
                {recentIncomes.map((income) => (
                  <div
                    key={income._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-lg">
                        {income.icon}
                      </div>
                      <div>
                        <h3 className="text-md font-semibold text-gray-800">
                          {income.source}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(income.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">
                      + ${income.amount}
                    </span>
                  </div>
                ))}
                {recentIncomes.length === 0 && (
                  <p className="text-center text-gray-500">
                    No recent incomes found.
                  </p>
                )}
              </div>
            </div>

            {/* Recent Income Sources Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 flex flex-col h-auto">
              <h2 className="text-xl font-bold text-gray-800 text-center mb-4 mt-12">
                Recently Added Income Sources
              </h2>
              <div className="flex justify-center">
                <div className="w-64 h-64">
                  <Doughnut
                    data={incomeChartData}
                    options={incomeChartOptions}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5 mt-5">
            {/* Recent Expenses Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 flex flex-col h-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Expense Sources
                </h2>
                <button
                  className="px-3 py-1 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 hover:text-red-700 transition-all duration-300 shadow-md"
                  onClick={() => (window.location.href = "/budget")}
                >
                  See All
                </button>
              </div>
              <div className="space-y-3">
                {recentExpenses.map((expense) => (
                  <div
                    key={expense._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-lg">
                        {expense.icon || "💸"}
                      </div>
                      <div>
                        <h3 className="text-md font-semibold text-gray-800">
                          {expense.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(expense.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="text-red-600 font-semibold">
                      - ${expense.amount}
                    </span>
                  </div>
                ))}
                {recentExpenses.length === 0 && (
                  <p className="text-center text-gray-500">
                    No recent expenses found.
                  </p>
                )}
              </div>
            </div>

            {/* Recent Expense Sources Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 flex flex-col h-auto">
              <h2 className="text-xl font-bold text-gray-800 text-center mb-4 mt-12">
                Recently Added Expense Sources
              </h2>
              <div className="flex justify-center">
                <div className="w-64 h-64">
                  <Doughnut
                    data={expenseChartData}
                    options={expenseChartOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
