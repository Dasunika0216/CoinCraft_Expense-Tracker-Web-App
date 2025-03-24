import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Income = () => {
  const [showForm, setShowForm] = useState(false);
  const [icon, setIcon] = useState("💰");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [incomes, setIncomes] = useState([]);

  const icons = ["💰", "💼", "💻", "🏢", "🎨", "📚", "🎵", "🎮", "📱", "✏️"];

  const fetchIncome = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/list-income",
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
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
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/add-income",
        { icon, source, amount, date },
        { headers: { token: localStorage.getItem("token") } }
      );
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
        } catch (error) {
          console.log("Error in adding the income", error);
        }
      }
    } catch (error) {
      console.log("Error in adding the income", error);
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 pt-20">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Income Sources
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center px-4 py-2 bg-[#0e3b8f] text-white rounded-lg hover:bg-[#031b3a] transition-colors duration-200 ease-in-out"
                >
                  <span className="mr-1 text-lg font-medium">+</span>
                  Add Income
                </button>
              </div>
            </div>

            {/* Income Chart */}
            <div className="mb-8">
              <Bar options={chartOptions} data={chartData} />
            </div>

            {showForm && (
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Add Income
                  </h3>
                  <button
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className="text-sm text-gray-600">Change Icon</span>
                  </button>
                </div>

                {showIconPicker && (
                  <div className="mb-4 p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-5 gap-2">
                      {icons.map((icon, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setIcon(icon);
                            setShowIconPicker(false);
                          }}
                          className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <form className="mt-3" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="block text-gray-600 text-sm mb-1">
                      Income Source
                    </label>
                    <input
                      type="text"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Enter income source"
                      required={true}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-600 text-sm mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Enter income amount"
                      required={true}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-600 text-sm mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="mm/dd/yyyy"
                      required={true}
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
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
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Income Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incomes.map((income, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <span className="text-2xl">{income.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {income.source}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(income.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-500 font-semibold">
                        + ${income.amount}
                      </p>
                      <div className="mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-500 inline-block"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Income;
