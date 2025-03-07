import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const LineChartComponent = ({ data = [{ name: "Default", value: 0 }], layoutId, ctitle="Chart Title", xtitle="X Axis Title", ytitle="Y Axis Title" }) => (

  <ResponsiveContainer width="100%" height="90%" layoutId={layoutId}>
    {/* {ctitle} {xtitle} {ytitle} */}

  <LineChart data={data ?? {"test": "one"}}>
    <CartesianGrid strokeDasharray="4 4" />
    <XAxis>
    <Label value={xtitle} offset={-7} position="bottom" />
    </XAxis>
    <YAxis>
      <Label value={ytitle} offset={-15} angle={-90} position="center"/>
    </YAxis>
    <Tooltip />
    <Legend/>
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
  <div style={{paddingLeft: "20px", marginBottom: '10px', fontWeight: 'bold' }}>
      <h3>{ctitle}</h3>  {/* Display Chart Title */}
    </div>
  </ResponsiveContainer>
);

export default LineChartComponent;
