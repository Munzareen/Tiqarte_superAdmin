import { Box } from "@mui/material"
import React from "react"
import ReactApexChart from "react-apexcharts"
const RadialChartSingle = ({ name, value }) => {
  const chartData = {
    series: [value],
    chart: {
      type: "radialBar",
      offsetX: 0,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#2460B8",
            fontSize: "13px"
          },
          value: {
            show: true,
            offsetY: -2,
            fontSize: "18px",
            fontStyle: "bold"
          },
        },
      },
    },
    
    labels: [name],
    colors: ["#2460B8"],
  }
  return (
    <Box sx={{ width: "50%" }}>
      <ReactApexChart
        options={chartData}
        series={chartData.series}
        type='radialBar'
        // width="800"
        height={240}
      />
    </Box>
  )
}

export default RadialChartSingle
