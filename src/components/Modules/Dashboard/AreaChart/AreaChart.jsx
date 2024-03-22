import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
} from "recharts"
import { differenceInMonths, addMonths, format } from 'date-fns';

const generateMonthlyData = (startDate, endDate) => {
  const months = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    months.push({
      month: format(currentDate, 'MMM'),
      price: Math.floor(Math.random() * 2000), // You can replace this with your actual data logic
    });
    currentDate = addMonths(currentDate, 1);
  }

  return months;
};

export const AreaGraphs = ({startDate, endDate}) => {

  const [dynamicData, setDynamicData] = useState([]);

  useEffect(() => {
    const generatedData = generateMonthlyData(new Date(startDate), new Date(endDate));
    setDynamicData(generatedData);
  }, [startDate,endDate]);

  return (
    <ResponsiveContainer width='95%' height={351}>
      <AreaChart
        data={dynamicData}
        margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis axisLine={false}  dataKey='month' />
        <YAxis   axisLine={false} tickFormatter={(value) => `$${value}`} />
        <CartesianGrid stroke='#ccc'  strokeDasharray='5 5' />
        <Tooltip />
        <Legend />
        <Area
          type='linear'
          dataKey='price'
          stroke='#2460B8'
          fillOpacity={0.2}
          fill='url(#colorGrad)'
          strokeWidth={3}
        />
        <defs>
          <linearGradient id='colorGrad' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#2460B8' stopOpacity={1} />
            <stop offset='100%' stopColor='#fff' stopOpacity={1} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  )
}
