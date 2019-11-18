import React from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from "recharts";

const convertData = (measurements: Array<any>) => {
    const eachMeasObj: any = {};
    const total: any = [];
    const allMetrics: Array<string> = [];
    (measurements && measurements.forEach((value) => {
        const meas = value.measurements;
        allMetrics.push(value.metric);
        meas.forEach((eachMeas: any, i: number) => {
            if(!eachMeasObj[eachMeas.at]) {
                let eachMeasObjAt: any = {};
                eachMeasObj[eachMeas.at] = eachMeasObjAt;
                eachMeasObjAt.at = eachMeas.at;
                eachMeasObjAt.time = new Date(eachMeas.at).toLocaleString(undefined, {
                    month: "short", day: "numeric", 
                    hour: "numeric", minute: "numeric"
                });
                total.push(eachMeasObjAt);
            }
            eachMeasObj[eachMeas.at][eachMeas.metric] = eachMeas.value;
        })
    }));

    return [allMetrics, total];
}
  const colorsPallette = ['#006494', "#13293D", "#69140E", "#A44200", "#F2F3AE", "#48E5C2"];
  const getRandomColor = (i:number) => {
      if(i>5) {
        return "#"+((1<<24)*Math.random()|0).toString(16);
      } else {
          return colorsPallette[i];
      }
    
  }

export default (props: any) => {

    const [allMetrics, measurementsData] = convertData(props.multipleMeasurements);
    if(!measurementsData || measurementsData.length === 0) return null;
    return (
        <LineChart width={600} height={300} data={measurementsData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="time" tickFormatter={(value)=> {
                return value && value.split(",")[1].trim();
            }}/>
            <YAxis/>
            <Tooltip formatter={(value) => {
                    console.log(value);
                    return value;
                }}/>
            <Legend layout="vertical" 
            verticalAlign="middle" align="right"/>
            {allMetrics.map((eachMetric: string, index: number) => <Line key={eachMetric} type="monotone" dataKey={eachMetric} dot={false} stroke={getRandomColor(index)}/>) }
    </LineChart>
    )


};