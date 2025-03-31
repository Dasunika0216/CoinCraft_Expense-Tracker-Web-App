import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';

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
  },[])

  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar />
      <div className="flex justify-center pt-20 min-h-screen">
        <div className="w-full max-w-6xl">
          <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800 drop-shadow-lg">
            Dashboard
          </h1>
          <div className="flex justify-between gap-6">
            {/* Total Income Card */}
            <div className="bg-gradient-to-b from-[#0b0259] to-indigo-900 shadow-2xl rounded-xl p-8 flex-1 text-center transform transition duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="text-orange-300 text-2xl font-semibold mb-3">
                Total Income
              </div>
              <div className="text-4xl text-white">
                ${totalIncome}
              </div>
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
              <div className="text-4xl text-white">${Math.max(0, totalIncome - totalExpense)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
