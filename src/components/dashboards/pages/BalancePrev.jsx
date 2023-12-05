import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

export const data2 = [
  ["Day", "Ventas Mensuales", "Ventas Diaria", "ventas semanales"],
  [1, 37.8, 80.8, 41.8],
  [2, 30.9, 69.5, 32.4],
  [3, 25.4, 57, 25.7],
  [4, 11.7, 18.8, 10.5],
  [5, 11.9, 17.6, 10.4],
  [6, 8.8, 13.6, 7.7],
  [7, 7.6, 12.3, 9.6],
  [8, 12.3, 29.2, 10.6],
  [9, 16.9, 42.9, 14.8],
  [10, 12.8, 30.9, 11.6],
  [11, 5.3, 7.9, 4.7],
  [12, 6.6, 8.4, 5.2],
  [13, 4.8, 6.3, 3.6],
  [14, 4.2, 6.2, 3.4],
];

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
  chart2: {
    title: "Box Office Earnings in First Two Weeks of Opening",
    subtitle: "in millions of dollars (USD)",
  },
};
export default function BalancePrev() {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <div className="flex flex-col w-1/2 h-full">
        <div id="chart1" className="w-full h-1/2">
          <Chart
            chartType="Bar"
            width="100%"
            height="100%"
            data={data}
            options={options.chart}
          />
        </div>
        <div id="estadistica" className="h-1/2 w-full">
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-20">
              <div class="flex flex-wrap w-full mb-8">
                <div class="w-full mb-6 lg:mb-0">
                  <h1 class="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900">
                    Estadistica
                  </h1>
                  <div class="h-1 w-20 bg-indigo-500 rounded"></div>
                </div>
              </div>
              <div class="flex flex-wrap -m-4 text-center">
                <div class="p-4 sm:w-1/3 w-1/2">
                  <div class="bg-indigo-500 rounded-lg p-2 xl:p-6">
                    <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">
                      $1k
                    </h2>
                    <p class="leading-relaxed text-gray-100 font-bold">
                      Diario
                    </p>
                  </div>
                </div>
                <div class="p-4 sm:w-1/3 w-1/2">
                  <div class="bg-indigo-500 rounded-lg p-2 xl:p-6">
                    <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">
                      50
                    </h2>
                    <p class="leading-relaxed text-gray-100 font-bold">
                      Garrafones Vendidos
                    </p>
                  </div>
                </div>
                <div class="p-4 sm:w-1/3 w-1/2">
                  <div class="bg-indigo-500 rounded-lg p-2 xl:p-6">
                    <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">
                      35
                    </h2>
                    <p class="leading-relaxed text-gray-100 font-bold">
                      Pedidos pendientes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div id="chart2" className="w-1/2 h-full m-2">
        {" "}
        <Chart
        className="bg-transparent"
          chartType="Line"
          width="100%"
          height="90%"
          data={data2}
          options={options.chart2}
        />
      </div>
    </div>
  );
}
