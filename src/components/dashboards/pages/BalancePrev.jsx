import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";

const BalancePrev = () => {
  const [timeframe, setTimeframe] = useState("day");

  // Datos de ejemplo para los gráficos y la lista de ventas detalladas
  const salesData = {
    day: {
      labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      values: [100, 200, 150, 300, 250],
    },
    week: {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      values: [500, 800, 700, 900],
    },
    month: {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
      values: [2000, 1800, 2200, 2500, 2300],
    },
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="flex">
      <div className="w-12">
        {/* Gráfico */}
        {timeframe === "day" && (
          <Line
            data={{
              labels: salesData.day.labels,
              datasets: [
                {
                  label: "Ventas diarias",
                  data: salesData.day.values,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgba(75,192,192,1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        )}
        {timeframe === "week" && (
          <Bar
            data={{
              labels: salesData.week.labels,
              datasets: [
                {
                  label: "Ventas semanales",
                  data: salesData.week.values,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgba(75,192,192,1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        )}
        {timeframe === "month" && (
          <Line
            data={{
              labels: salesData.month.labels,
              datasets: [
                {
                  label: "Ventas mensuales",
                  data: salesData.month.values,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgba(75,192,192,1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        )}
        {/* Selector de timeframe */}
        <div className="mt-4">
          <button
            className={`mr-2 ${
              timeframe === "day" ? "bg-blue-500 text-white" : "bg-gray-200"
            } px-4 py-2 rounded`}
            onClick={() => handleTimeframeChange("day")}
          >
            Día
          </button>
          <button
            className={`mr-2 ${
              timeframe === "week" ? "bg-blue-500 text-white" : "bg-gray-200"
            } px-4 py-2 rounded`}
            onClick={() => handleTimeframeChange("week")}
          >
            Semana
          </button>
          <button
            className={`mr-2 ${
              timeframe === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
            } px-4 py-2 rounded`}
            onClick={() => handleTimeframeChange("month")}
          >
            Mes
          </button>
        </div>
      </div>
      <div className="w-1/2">
        {/* Lista de ventas detalladas */}
        <ul className="mt-4"></ul>
      </div>
    </div>
  );
};

export default BalancePrev;
