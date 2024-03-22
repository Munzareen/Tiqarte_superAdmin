// import React from 'react';
// import { RadialBarChart, RadialBar, Legend } from 'recharts';

// const data = [
//   { name: 'male', uv: 0.47, pv: 2400, fill: '#BFBFBF' },
//   { name: 'female', uv: 60.69, pv: 4567, fill: '#707070' },
//   { name: 'child', uv: 15.69, pv: 1398, fill: '#2460B8' },

// ];

// const SimpleRadialBarChart = () => (
//   <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={data}>
//      <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise={true} dataKey="uv" />
//     <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
//   </RadialBarChart>
// );

// export default SimpleRadialBarChart;
import React from "react"
import ReactApexChart from "react-apexcharts"
const RadialGraph = ({formData, getCustomersDashboardData}) => {

  const chartData = {
    chart: {
      type: "radialBar",
      height: 200,
      offsetX: 0,
    },
    plotOptions: {
      radialBar: {
        offsetX: -28,
        offsetY: -25,
        inverseOrder: false,
        hollow: {
          margin: 5,
          size: "45%",
          background: "transparent",
        },
        track: {
          show: true,
          background: "#40475D",
          strokeWidth: "10%",
          opacity: 1,
          margin: 8, // margin is in pixels
          // background:"red"
        },
      },
    },
    colors: ["#2460B8", "#707070", "#BFBFBF"],
    series: [getCustomersDashboardData?.Male, getCustomersDashboardData?.Female, getCustomersDashboardData?.Child],
    labels: ["Male", "Female", "Child"],
    legend: {
      show: true,
      position: "right",
      offsetX: 10,
      offsetY: 75,
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%"
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  }

  return (
    <div>
      <ReactApexChart
        options={chartData}
        series={chartData.series}
        type='radialBar'
        // width="800"
        // height={300}
      />
    </div>
  )
}

export default RadialGraph
