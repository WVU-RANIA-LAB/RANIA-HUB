import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data, layoutId }) => (
  <ResponsiveContainer width="100%" height="100%" layoutId={layoutId}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="4 4" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
  </ResponsiveContainer>
);

export default LineChartComponent;
