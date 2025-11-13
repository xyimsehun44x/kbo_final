import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import Papa from "papaparse";
import "../styles/popup.css";
import { color } from "echarts";
const convertTopbotToKorean = (topbot) => {
  return topbot === "T" ? "초" : "말";
};

const WinProbChart = ({ visible, onClose }) => {
  const [option, setOption] = useState(null);
  const teamLeft = "롯데";
  const teamRight = "키움";
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    if (!visible) return;

    fetch("/kbo_vis/data/20250603WOLT02025.csv")
      .then((res) => res.blob())
      .then((blob) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsText(blob, "euc-kr");
      }))
      .then((csv) => {
        const parsed = Papa.parse(csv, { header: true });
        const raw = parsed.data;

        const formatted = raw.map((d, i) => {
          const wpaVal = parseFloat(d.wpa_rt);
          return {
            inning: d.inning,
            topbot: convertTopbotToKorean(d.inning_topbot),
            wpa_rt: isNaN(wpaVal) ? 0 : wpaVal,
            batter: d.batter || "-",
            pitch_result: d.pitch_result || "-",
            pa_result: d.pa_result || "-",
            idx: i,
          };
        });

        let cumulative = 50;
        const enrichedTimeline = formatted.map((d) => {
          const isBottom = d.topbot === "말"; // == inning_topbot === "B"
          const delta =
            (isReversed && isBottom) || (!isReversed && !isBottom)
            ? -d.wpa_rt
            : d.wpa_rt;
          cumulative += delta;

          return {
            inning: d.inning,
            topbot: d.topbot,
            xLabel: `${d.inning}${d.topbot}`,
            cum: cumulative.toFixed(2),
            diff: delta.toFixed(2),
            batter: d.batter,
            pitch_result: d.pitch_result,
            pa_result: d.pa_result,
          };
        });

        let lastX = "";
        const xAxisLabels = enrichedTimeline.map((d) => {
        if (d.xLabel !== lastX) {
            lastX = d.xLabel;
            return d.xLabel;
        } else return "";
        });
        const winLineColor = isReversed ? "#ff3f3f" : "#3f87ff";

        const chartOption = {
          grid:{
            right: "15%",
          },
          tooltip: {
            trigger: "axis",
            formatter: (params) => {
              const idx = params[0].dataIndex;
              const p = enrichedTimeline[idx];
              if (!p) return "";
              return `
                <strong>${p.inning}회${p.topbot}</strong><br/>
                🧢 타자: ${p.batter}<br/>
                ⚾️ 투구 결과: ${p.pitch_result}<br/>
                📝 타석 결과: ${p.pa_result}<br/>
                📈 승리확률: ${params[0].data}%<br/>
                📉 변화량: ${params[1].data}%p
              `;
            },
          },
          title: {
            text: `${isReversed ? teamRight : teamLeft} 기준 승리 확률`,
            left: "center",
            top: 10,
          },
          legend: {
            data: ["승리 확률", "모멘텀"],
            orient: "vertical",
            right: 0,
            top: "45%",
            textStyle: {
              fontFamily: "sans-serif",
              fontSize: 12,
            },
          },
          xAxis: {
            type: "category",
            data: xAxisLabels,
            axisLabel: {
                interval: 0,
                rotate: 45,
                show: true,
                color: "#333"
            },
            axisTick: {
                show: false         // 🔹 눈금선 제거
            },
            axisLine: {
                show: false         // 🔹 축선 제거
            },
            splitLine: {
                show: false         // 🔹 그리드선 제거
            },
        },

          yAxis: [
            {
              type: "value",
              name: isReversed ? teamRight + " 승률" : teamLeft + " 승률",
              min: 0,
              max: 100,
              interval: 10,
              nameTextStyle: { fontWeight: "bold", color: "#333" },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#ddd",

                },
              },
            },
            {
              type: "value",
              name: "모멘텀 변화(%p)",
              min: -10,
              max: 10,
              axisLine: { show: false },
              splitLine: { show: false },
            },
          ],
          series: [
            {
              name: "승리 확률",
              type: "line",
              data: enrichedTimeline.map((d) => d.cum),
              yAxisIndex: 0,
              smooth: true,
              symbol: "none",
              lineStyle: { width: 3, color: winLineColor },
            },
            {
              name: "모멘텀",
              type: "bar",
              data: enrichedTimeline.map((d) => d.diff),
              yAxisIndex: 1,
              itemStyle: {
                color: (p) => (p.value >= 0 ? "#3f87ff" : "#ff3f3f"),
              },
            },
          ],
        };

        setOption(chartOption);
      });
  }, [isReversed, visible]);

  if (!visible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-window">
        <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: "8px" }}></div>
            <button className="button-team-toggle"onClick={() => setIsReversed(!isReversed)}>
                기준 팀 바꾸기
            </button>
            <button onClick={onClose} className="button-close">X</button>

        {option ? (
          <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </div>
  );
};

export default WinProbChart;
