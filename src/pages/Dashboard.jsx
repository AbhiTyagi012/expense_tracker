import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import api from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [monthly, yearly, category, trend] = await Promise.all([
        api.analytics.monthly(),
        api.analytics.yearly(),
        api.analytics.category(),
        api.analytics.trend(),
      ]);

      setMonthlyData(monthly.data || []);
      setYearlyData(yearly.data || []);
      setCategoryData(category.data || []);
      setTrendData(trend.data || []);
    } catch (err) {
      console.error("Error fetching analytics", err);
    }
  };

  // Monthly Bar Chart
  const monthlyChart = {
    labels: monthlyData.map((m) => m._id),
    datasets: [
      {
        label: "Income",
        data: monthlyData.map(
          (m) => m.totals.find((t) => t.type === "income")?.total || 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
      {
        label: "Expense",
        data: monthlyData.map(
          (m) => m.totals.find((t) => t.type === "expense")?.total || 0
        ),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  // Yearly Bar Chart
  const yearlyChart = {
    labels: yearlyData.map((y) => y._id),
    datasets: [
      {
        label: "Income",
        data: yearlyData.map(
          (y) => y.totals.find((t) => t.type === "income")?.total || 0
        ),
        backgroundColor: "rgba(153, 102, 255, 0.7)",
      },
      {
        label: "Expense",
        data: yearlyData.map(
          (y) => y.totals.find((t) => t.type === "expense")?.total || 0
        ),
        backgroundColor: "rgba(255, 159, 64, 0.7)",
      },
    ],
  };

  // Category Pie Chart (fix for `category` instead of `_id`)
  const categoryChart = {
    labels: categoryData.map((c) => c.category),
    datasets: [
      {
        data: categoryData.map((c) => c.total),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8DD17E",
        ],
      },
    ],
  };

  // Trend Line Chart
  const trendChart = {
  labels: trendData.map((t) => t._id), // Using _id for month
  datasets: [
    {
      label: "Income",
      data: trendData.map((t) => {
        const incomeObj = t.totals.find((item) => item.type === "income");
        return incomeObj ? incomeObj.total : 0;
      }),
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
      tension: 0.3,
    },
    {
      label: "Expense",
      data: trendData.map((t) => {
        const expenseObj = t.totals.find((item) => item.type === "expense");
        return expenseObj ? expenseObj.total : 0;
      }),
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: true,
      tension: 0.3,
    },
  ],
};


  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Monthly Analytics</h2>
        <Bar data={monthlyChart} />
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Yearly Analytics</h2>
        <Bar data={yearlyChart} />
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
        <Pie data={categoryChart} />
      </div>

      <div className="bg-white shadow rounded p-4 md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Income vs Expense Trend</h2>
        <Line data={trendChart} />
      </div>
    </div>
  );
}
