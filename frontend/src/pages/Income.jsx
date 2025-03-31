import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Chart as ChartJS, CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

const Income = () => {
  const [showForm, setShowForm] = useState(false);
  const [icon, setIcon] = useState("💰");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const icons = ["💰", "💼", "💻", "🏢", "🎨", "📚", "🎵", "🎮", "📱", "✏️"];

  const fetchIncome = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/dashboard/list-income", {}, { headers: { token: localStorage.getItem("token")}});
      console.log(response.data.data);

      if (response.data.success) {
        setIncomes(response.data.data);
      }
    } catch (error) {
      console.log("Error in fetching the income", error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(icon, source, amount, date);

    try {
      const response = await axios.post("http://localhost:4000/api/dashboard/add-income", { icon, source, amount, date }, { headers: { token: localStorage.getItem("token")}});
      console.log(response.data);

      if (response.data.success) {
        try {
          setShowForm(false);
          setShowIconPicker(false);
          setIcon("💰");
          setSource("");
          setAmount("");
          setDate("");
          fetchIncome();
          toast.success("Income added successfully!");
        } catch (error) {
          console.log("Error in adding the income", error);
        }
      }
    } catch (error) {
      console.log("Error in adding the income", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/api/dashboard/delete-income", { id }, { headers: { token: localStorage.getItem("token")}});

      if (response.data.success) {
        setShowDeleteConfirm(false);
        setDeleteId(null);
        fetchIncome();
        toast.success("Income deleted successfully!");
      }
    } catch (error) {
      console.log("Error in deleting the income", error);
    }
  };

  const chartData = {
    labels: [...incomes]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 13)
      .map((income) => new Date(income.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })),
    datasets: [
      {
        label: "Income Amount ($)",
        data: [...incomes]
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 13)
          .map((income) => income.amount),
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
          {/* Income Overview Box */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Income Overview
                </h2>
                <p className="text-gray-500 mt-1">Track your earnings over time</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-[#0e3b8f] to-[#1e4cad] text-white rounded-xl hover:from-[#031b3a] hover:to-[#0e3b8f] transition-all duration-200 ease-in-out shadow-md hover:shadow-xl"
                >
                  <span className="mr-2 text-xl font-medium">+</span>
                  Add Income
                </button>
              </div>
            </div>

            {/* Income Chart */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <Bar options={chartOptions} data={chartData} />
            </div>
          </div>

          {/* Income List Box */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Recent Income Sources
                </h2>
                <p className="text-gray-500 mt-1">Your latest income entries</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {incomes.map((income, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 border border-green-100 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group hover:border-green-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-5">
                      <div className="p-4 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow border border-green-50">
                        <span className="text-3xl">{income.icon}</span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {income.source}
                        </h3>
                        <p className="text-gray-500">
                          {new Date(income.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <p className="text-green-500 font-bold text-xl">
                        + ${income.amount}
                      </p>
                      <div className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-500 transform group-hover:translate-y-[-2px] transition-transform"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <button
                          onClick={() => {
                            setDeleteId(income._id);
                            setShowDeleteConfirm(true);
                          }}
                          className="text-red-500 hover:text-red-600 transition-colors"
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
            </div>
          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Add Income</h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setShowIconPicker(false);
                    setIcon("💰");
                    setSource("");
                    setAmount("");
                    setDate("");
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl bg-gray-50 p-3 rounded-xl">{icon}</span>
                  <button
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Change Icon
                  </button>
                </div>
              </div>

              {showIconPicker && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="grid grid-cols-5 gap-3">
                    {icons.map((icon, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIcon(icon);
                          setShowIconPicker(false);
                        }}
                        className="text-2xl p-3 hover:bg-white rounded-lg transition-all hover:shadow-md"
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Income Source
                  </label>
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter income source"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    max={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setShowIconPicker(false);
                      setIcon("💰");
                      setSource("");
                      setAmount("");
                      setDate("");
                    }}
                    className="px-6 py-3 text-gray-500 hover:text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#0e3b8f] to-[#1e4cad] text-white rounded-xl hover:from-[#031b3a] hover:to-[#0e3b8f] transition-all shadow-md hover:shadow-xl"
                  >
                    Add Income
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this income entry? This action cannot be undone.
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
    </div>
  );
};

export default Income;
