import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const Expense = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const budgetId = location.state?.budgetId;
  const [budget, setBudget] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    try {
        const response = await axios.post('http://localhost:4000/api/dashboard/delete-budget', {budgetId}, {headers: {token: localStorage.getItem("token")}});

        if (response.data.success) {
            toast.success("Budget deleted successfully");
            navigate('/budget');
        }
        
    } 
    catch (error) {
      toast.error('Error deleting budget');
      console.log(error);
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
          {/* Header with Back Title and Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/budget')}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-800">My Expenses</h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>

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

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Delete Budget</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this budget?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleDelete();
                      setShowDeleteConfirm(false);
                    }}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
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
