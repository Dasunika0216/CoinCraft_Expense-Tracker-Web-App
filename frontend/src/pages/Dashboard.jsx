import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const fetchTotalIncome = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/dashboard/total-income', {}, { headers: { token: localStorage.getItem("token") }});
      // console.log(response.data);

      if (response.data.success) {
        setTotalIncome(response.data.data[0].totalIncome);
      }
    } 
    catch (error) {
      console.error("Error fetching total income:", error);
    }
  };

  const fetchTotalExpenses = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/dashboard/total-expense', {}, { headers: { token: localStorage.getItem("token") }});
      console.log(response.data);

      if (response.data.success) {
        setTotalExpense(response.data.data[0].totalExpense);
      }
    } 
    catch (error) {
      console.error("Error fetching total income:", error);
    }
  };

  useEffect(() => {
    fetchTotalIncome();
    fetchTotalExpenses();
  },[]);

  const totalBalance = Math.max(0, totalIncome - totalExpense);

   // Data for the Doughnut Chart
   const chartData = {
    labels: ['Total Balance', 'Total Expenses', 'Total Income'],
    datasets: [
      {
        data: [totalBalance, totalExpense, totalIncome],
        backgroundColor: ['#7e3af2', '#f05252', '#f97316'], // Colors for each section
        hoverBackgroundColor: ['#6b21a8', '#dc2626', '#ea580c'], // Hover colors
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4b5563', // Text color
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


        </div>
      </div>
    </div>
  );
}

export default Dashboard
