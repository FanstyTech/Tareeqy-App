import React from "react";
import Chart from "react-apexcharts";

interface IndexProps {
  options: any;
  series: any;
  type:
    | "line"
    | "area"
    | "bar"
    | "histogram"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "treemap"
    | "boxPlot"
    | "candlestick"
    | "radar"
    | "polarArea"
    | "rangeBar";
}
const Index: React.FC<IndexProps> = (props) => {
  const { options, series, type } = props;
  return (
    <Chart
      className="bg-white border-radius"
      options={options}
      series={series}
      type={type}
    />
  );
};
export default Index;
