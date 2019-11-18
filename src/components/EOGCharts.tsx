import React from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from "recharts";

const convertData = (measurements: Array<any>) => {
    const eachMeasObj: any = {};
    const total: any = [];
    const allMetrics: Array<string> = [];
    (measurements && measurements.forEach((value, index, array) => {
        const meas = value.measurements;
        allMetrics.push(value.metric);
        meas.forEach((eachMeas: any, i: number) => {
            if(!eachMeasObj[eachMeas.at]) {
                let eachMeasObjAt: any = {};
                eachMeasObj[eachMeas.at] = eachMeasObjAt;
                eachMeasObjAt.at = eachMeas.at;
                total.push(eachMeasObjAt);
            }
            eachMeasObj[eachMeas.at][eachMeas.metric] = eachMeas.value;
        })
        // return total;
    }));

    return [allMetrics, total];
}

  const getRandomColor = () => {
    return "#"+((1<<24)*Math.random()|0).toString(16);
  }

export default (props: any) => {

    const [allMetrics, measurementsData] = convertData(props.multipleMeasurements);
    if(!measurementsData || measurementsData.length === 0) return null;
    return (
        <LineChart width={600} height={300} data={measurementsData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="at"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            {allMetrics.map((eachMetric: string) => <Line type="monotone" dataKey={eachMetric} dot={false} stroke={getRandomColor()}/>) }
            {/* <Line type="monotone" dataKey="tubingPressure" stroke="#ff0000" dot={false}/> */}
    </LineChart>
    )


};