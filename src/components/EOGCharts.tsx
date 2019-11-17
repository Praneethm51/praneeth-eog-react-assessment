import React from "react";
import { render } from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

const useStyles = makeStyles({
  card: {
    margin: '10px',
  },
});

const equipmentTypes = [
  { title: 'injValveOpen', value: 'injValveOpen' },
  { title: 'oilTemp', value: 'oilTemp' },
  { title: 'tubingPressure', value: 'tubingPressure' },
  { title: 'flareTemp', value: 'flareTemp' },
  { title: 'casingPressure', value: 'casingPressure' },
  { title: 'waterTemp', value: 'waterTemp' }
];

export default (props: any) => {
//     const { loading, error, data } = useQuery(gql`
//     {
//       rates(currency: "USD") {
//         currency
//         rate
//       }
//     }
//   `);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return data.rates.map((val: any) => (
//     <div key={val.currency}>
//       <p>
//         {val.currency}: {val.rate}
//       </p>
//     </div>
//   ));


  return props.multipleMeasurements && props.multipleMeasurements.map((data: any) => (
    	<LineChart width={600} height={300} data={data.measurements}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="at"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
      </LineChart>
    )
    ) || null;


};