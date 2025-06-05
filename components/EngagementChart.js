import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function KeywordChart({ data }) {
  const { series } = data;
  console.log("series", series);

  const options = {
    chart: { type: "line", height: 600 },
    title: { text: "Timeline Engagement", align: "left" },
    xAxis: {
      type: "datetime",
      title: { text: "Date" },
      labels: { format: "{value:%Y-%m-%d}" },
    },
    yAxis: {
      title: { text: "Keyword Count" },

      allowDecimals: false,
    },
    tooltip: {
      shared: true,
      formatter: function () {
        let s = `<b>${Highcharts.dateFormat("%Y-%m-%d", this.x)}</b>`;
        this.points.forEach((point) => {
          s += `<br/><span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${point.y}</b>`;
        });
        return s;
      },
    },
    plotOptions: {
      column: { stacking: "normal" },
    },
    series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
