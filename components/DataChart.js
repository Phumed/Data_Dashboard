import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function DataChart({ data }) {
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Timeline Data",
      align: "left",
    },
    xAxis: {
      categories: data.map((d) => d.dateKey),
      type: "datetime",
      labels: { rotation: -45 },
    },
    yAxis: {
      title: {
        text: "Message Count",
      },
    },
    tooltip: {
      shared: true,
    },
    series: [
      {
        name: "Messages",
        data: data.map((d) => d.count),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
