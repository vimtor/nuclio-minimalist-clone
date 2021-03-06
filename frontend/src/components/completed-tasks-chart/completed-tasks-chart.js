import Chart from "react-apexcharts";
import LineChartOptions from "./completed-tasks-chart.options";
import useChart from "../../hooks/use-chart";

export default function CompletedTasksChart() {
  const { chartTasks } = useChart();

  const chartData = {
    createdArray: [],
    completedArray: [],
    dates: [],
  };

  if (chartTasks) {
    Object.keys(chartTasks).forEach((key) => {
      chartData.completedArray.push(chartTasks[key].completed);
      chartData.createdArray.push(chartTasks[key].created);
      chartData.dates.push(key);
    });
  }

  const series = [
    {
      name: "Created",
      data: chartData.createdArray,
    },
    {
      name: "Completed",
      data: chartData.completedArray,
    },
  ];

  const options = LineChartOptions;
  options.labels = chartData.dates;

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
      height="400px"
    />
  );
}
