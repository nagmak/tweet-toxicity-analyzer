import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Sarcasm', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Hostile', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Homophobic', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Racist', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Sexist', uv: 3490, pv: 4300, amt: 2100,
  },
];

// export default class SimpleBarChart extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/90v76x08/';

//   render() {
//     return (
//       <BarChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 20, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="pv" stackId="a" fill="#8884d8" />
//         <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
//       </BarChart>
//     );
//   }
// }

export default class SimpleBarChart{
  render(){
    return(
      <img src="Bargraph.png"/>
    );
  }
}