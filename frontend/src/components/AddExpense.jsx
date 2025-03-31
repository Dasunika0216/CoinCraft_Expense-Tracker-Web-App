import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddExpense = ({ budgetId, onExpenseAdded }) => {
  // const { addExpense } = useContext(ExpenseContext);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expenseName.trim() || !expenseAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/dashboard/add-expense", { name: expenseName, amount: expenseAmount, budgetId: budgetId, date: expenseDate}, { headers: { token: localStorage.getItem("token")}});
      console.log(response.data);

      if (response.data.success) {
        // addExpense(expenseAmount); 
        // setItemCount(response.data.itemCount);
        toast.success("Expense added successfully");

        setExpenseName("");
        setExpenseAmount("");

        if (onExpenseAdded) {
          onExpenseAdded();
        }
      } else {
        toast.error(response.data.message || "Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error(error.response?.data?.message || "Error adding expense");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="expenseName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expense Name
          </label>
          <input
            id="expenseName"
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="e.g. Bedroom Decor"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label
            htmlFor="expenseAmount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expense Amount
          </label>
          <input
            id="expenseAmount"
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="e.g. 1000"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
            min="0"
            step="0.01"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200 font-medium"
        >
          Add New Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
