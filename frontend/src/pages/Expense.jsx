import React from "react";
import Navbar from "../components/Navbar";

const Expense = () => {
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
            <button className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center min-h-[200px] hover:shadow-xl transition-shadow cursor-pointer">
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
        </div>
      </main>
    </div>
  );
};

export default Expense;
