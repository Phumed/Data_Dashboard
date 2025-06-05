import { React, useState, useEffect, useMemo } from "react";
import data from "../data/example_data.json";
import DataChart from "../components/DataChart";
import KeywordChart from "../components/KeywordChart";
import EngagementChart from "../components/EngagementChart";

function dashboard() {
  const [chartData, setChartData] = useState([]);
  const [keywordData, setKeywordData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  function countMessagesByDate(data) {
    const grouped = {};
    data.forEach((item) => {
      const date = new Date(item.publisheddate);

      const dateKey = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
      grouped[dateKey] = (grouped[dateKey] || 0) + 1;
    });
    console.log("grouped", grouped);
    return Object.entries(grouped).map(([dateKey, count]) => ({
      dateKey,
      count,
    }));
  }

  // Get all unique keywords for columns
  function countKeywordsByDate(data) {
    const grouped = {};

    data.forEach((item) => {
      const dateKey = new Date(item.publisheddate).toISOString().slice(0, 10); // "YYYY-MM-DD"
      const keywords =
        item.keyword
          ?.split(",")
          .map((k) => k.trim())
          .filter(Boolean) || [];

      if (!grouped[dateKey]) grouped[dateKey] = {};

      // Initialize keyword counts for the date if not already present
      keywords.forEach((kw) => {
        grouped[dateKey][kw] = (grouped[dateKey][kw] || 0) + 1;
      });
    });

    const allKeywords = [
      ...new Set(Object.values(grouped).flatMap((kws) => Object.keys(kws))),
    ];
    const sortedDates = Object.keys(grouped).sort();

    const series = allKeywords.map((keyword) => ({
      name: keyword,
      data: sortedDates.map((date) => ({
        x: new Date(date).getTime(),
        y: grouped[date][keyword] || 0,
      })),
    }));

    return { series };
  }

  function countEngagementByDate(data) {
    const grouped = {};
    const engagementTypes = [
      "engagement_angry",
      "engagement_comment",
      "engagement_like",
      "engagement_love",
      "engagement_sad",
      "engagement_share",
      "engagement_view",
      "engagement_wow",
    ];
    data.forEach((item) => {
      const dateKey = new Date(item.publisheddate).toISOString().slice(0, 10); // "YYYY-MM-DD"
      if (!grouped[dateKey]) grouped[dateKey] = {};
      engagementTypes.forEach((type) => {
        grouped[dateKey][type] =
          (grouped[dateKey][type] || 0) + (item[type] || 0);
      });
    });
    const sortedDates = Object.keys(grouped).sort();
    const series = engagementTypes.map((et) => ({
      name: et,
      data: sortedDates.map((date) => ({
        x: new Date(date).getTime(),
        y: grouped[date][et] || 0,
      })),
    }));
    console.log("series", series);
    return { series };
  }

  useEffect(() => {
    const result = countMessagesByDate(data);
    setChartData(result);
    // console.log("result", result);

    const keywordResult = countKeywordsByDate(data);
    setKeywordData(keywordResult);
    console.log("keywordResult", keywordResult);

    const engagementResult = countEngagementByDate(data);
    console.log("engagementResult", engagementResult);
    setEngagementData(engagementResult);
  }, []);

  return (
    <div className="relative">
      <div className="sticky top-0 w-screen py-4 px-8 font-semibold border border-b-gray-200">
        Dashboard
      </div>
      <div className="px-24 py-12">
        {chartData?.length > 0 && <DataChart data={chartData} />}{" "}
        {engagementData && <EngagementChart data={engagementData} />}
        {keywordData && <KeywordChart data={keywordData} />}
      </div>
    </div>
  );
}

export default dashboard;
