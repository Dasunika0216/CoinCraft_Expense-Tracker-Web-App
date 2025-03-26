import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Expense = () => {
  const location = useLocation();
  const budgetId = location.state?.budgetId;
  const [budget, setBudget] = useState(null);

  const handleDelete = async () => {
    try {
        const response = await axios.post('http://localhost:4000/api/dashboard/delete-budget', {budgetId}, {headers: {token: localStorage.getItem("token")}});

        
        
    } 
    catch (error) {
        
    }
  }

  // Fetch budget details
  useEffect(() => {
    const fetchBudgetDetails = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/dashboard/list-budget', {}, { headers: { token: localStorage.getItem("token")}});
        if (response.data.success) {
          const selectedBudget = response.data.data.find(b => b._id === budgetId);
          setBudget(selectedBudget);
        }
      } catch (error) {
        console.log("Error fetching budget details:", error);
      }
    };

    if (budgetId) {
      fetchBudgetDetails();
    }
  }, [budgetId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="w-full max-w-5xl mx-auto space-y-8">
          {/* Budget Card */}
          {budget && (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 max-w-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">
                    {budget.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{budget.name}</h3>
                    <p className="text-sm text-gray-500">{budget.expenses?.length || 0} Item{budget.expenses?.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <span className="text-indigo-600 font-semibold">${budget.allocatedAmount}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${budget.expenses?.reduce((total, expense) => total + expense.amount, 0) || 0} Spent</span>
                  <span>${budget.allocatedAmount - (budget.expenses?.reduce((total, expense) => total + expense.amount, 0) || 0)} Remaining</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${((budget.expenses?.reduce((total, expense) => total + expense.amount, 0) || 0) / budget.allocatedAmount) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Expense;
