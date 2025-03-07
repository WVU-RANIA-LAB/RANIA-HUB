import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const BarChartComponent = ({ data = [{name: "cat1", value:10}, {name:"cat2", value: 3}, {name:"cat3", value: 6}], layoutId, ctitle="Chart Title", xtitle="X Axis Title", ytitle="Y Axis Title"  }) => (
  <ResponsiveContainer width="100%" height="100%" layoutId={layoutId}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" >
      <Label value={xtitle} offset={-7} position="bottom" />
    </XAxis>
    <YAxis>
      <Label value={ytitle} offset={-15} angle={-90} position="center"/>
    </YAxis>
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#8884d8" />
  </BarChart>
  <div style={{paddingLeft: "20px", marginBottom: '10px', fontWeight: 'bold' }}>
      <h3>{ctitle}</h3>  {/* Display Chart Title */}
    </div>
  </ResponsiveContainer>
);

export default BarChartComponent;
