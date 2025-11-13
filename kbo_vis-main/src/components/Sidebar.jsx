// src/components/Sidebar.jsx
import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import '../styles/sidebar.css';
const PITCH_TYPE_COLORS = {
  포심: '#1f77b4',
  슬라이더: '#ff7f0e',
  커브: '#2ca02c',
  체인지업: '#d62728',
  스플리터: '#9467bd',
  투심: '#8c564b'
};
const EVENT_COLORS = {
  삼진: '#1f77b4',    // 파란색
  피안타: '#d62728',  // 빨간색
  볼넷: '#ff7f0e',    // 주황색
};
const pa_data = [
  { name: "볼넷", value: 3 },
  { name: "안타", value: 1 },
  { name: "2루타", value: 1 },
  { name: "홈런", value: 1 },
  { name: "자동 고의 4구", value: 1 },
  { name: "포스 아웃", value: 1 },
  { name: "필드 아웃", value: 1 },
  { name: "희생 플라이", value: 1 },
  { name: "삼진", value: 2 }
];
const pitchData = [
  {
    pitchType: '슬라이더',
    total: 23,
    볼: 11,
    스트라이크: 3,
    타격: 3,
    파울: 4,
    헛스윙: 2,
  },
  {
    pitchType: '직구',
    total: 48,
    볼: 13,
    스트라이크: 6,
    타격: 16,
    파울: 9,
    헛스윙: 4,
  },
  {
    pitchType: '체인지업',
    total: 13,
    볼: 9,
    스트라이크: 1,
    타격: 0,
    파울: 3,
    헛스윙: 0,
  },
  {
    pitchType: '커브',
    total: 9,
    볼: 6,
    스트라이크: 2,
    타격: 0,
    파울: 1,
    헛스윙: 0,
  },
];

function PitchResultDistributionChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);


    const resultTypes = ['볼', '스트라이크', '타격', '파울', '헛스윙'];
    const categories = pitchData.map(p => p.pitchType);

    // ✅ 시리즈 구성 (정규화 없이 실제 개수 사용)
    const stackSeries = resultTypes.map(result => ({
      name: result,
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        position: 'inside',
        formatter: ({ value }) => (value > 2 ? `${value}구` : ''),
        color: '#fff',
        fontSize: 11,
      },
      itemStyle: {
        borderWidth: 1,
      },
      data: pitchData.map(p => p[result]),
    }));

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params) => {
          const name = params[0].name;
          const total = pitchData.find(p => p.pitchType === name).total;
          const lines = [`<strong>${name} (총 ${total}구)</strong>`];
          params.forEach(p => {
            if (p.value > 0) {
              lines.push(`${p.marker} ${p.seriesName}: ${p.value}구`);
            }
          });
          return lines.join('<br/>');
        },
      },
      legend: {
        top: 'top',
        left: 'center',
        textStyle: { color: '#fff' },
        data: resultTypes,
      },
      grid: {
        top: '15%',
        bottom: '10%',
        left: '8%',
        right: '8%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: { color: '#ccc', fontSize: 12 },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}구',
          color: '#ccc',
        },
        splitLine: { show: false },
      },
      series: stackSeries,
    };

    chart.setOption(option);
    window.addEventListener('resize', chart.resize);
    return () => {
      window.removeEventListener('resize', chart.resize);
      chart.dispose();
    };
  }, []);

  return (
    <div ref={chartRef} style={{ width: '100%', height: 400 }} />
  );
}

function StrikeZoneHeatmap({ csvUrl, pitcher = '김연주', maxRows = 164, xBins = 12, yBins = 12 }) {
  const [heatData, setHeatData] = useState(null);

  useEffect(() => {
    fetch(csvUrl)
      .then(res => res.arrayBuffer())
      .then(buffer => {
        // CSV 파일이 CP949(EUC-KR) 인코딩일 경우 디코딩
        const decoder = new TextDecoder('euc-kr');
        const csvText = decoder.decode(buffer);
        const results = Papa.parse(csvText, { header: true });
        const rows = results.data
          .filter(r => r.pitcher === pitcher)
          .slice(0, maxRows);

        const xMin = -3.0, xMax = 3.0;
        const yMin = 0.0, yMax = 5.0;
        const xStep = (xMax - xMin) / xBins;
        const yStep = (yMax - yMin) / yBins;

        // 초기 그리드 생성
        const grid = Array.from({ length: yBins }, () => Array(xBins).fill(0));
        rows.forEach(r => {
          const px = parseFloat(r.px);
          const pz = parseFloat(r.pz);
          if (!isNaN(px) && !isNaN(pz) && px >= xMin && px <= xMax && pz >= yMin && pz <= yMax) {
            const xi = Math.min(Math.floor((px - xMin) / xStep), xBins - 1);
            const yi = Math.min(Math.floor((pz - yMin) / yStep), yBins - 1);
            grid[yi][xi] += 1;
          }
        });
        setHeatData({ grid, xBins, yBins });
      });
  }, [csvUrl, pitcher, maxRows, xBins, yBins]);

  if (!heatData) return <div>Loading heatmap...</div>;

  // 최대값 찾아서 상대 강도 계산
  const maxVal = heatData.grid.flat().reduce((a, b) => Math.max(a, b), 0);

  return (
    <div className="heatmap-grid">
      {heatData.grid.map((row, yi) => (
        <div key={yi} className="heatmap-row">
          {row.map((value, xi) => {
            const opacity = maxVal > 0 ? (value / (maxVal + 1)) : 0;
            return (
              <div
                key={xi}
                className="heatmap-cell"
                style={{ backgroundColor: `rgba(122,0,0,${opacity})` }}
              >
                {value > 0 ? value : ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
function SpeedBarChartECharts({ speedData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      grid: { left: '20%', right: '10%', top: '15%', bottom: '15%' },
      xAxis: {
        type: 'category',
        data: speedData.map(d => d.name),
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: '#ccc',
          fontSize: 11,
        },
      },
      yAxis: {
        type: 'value',
        min: 120,
        max: 160,
        axisLabel: {
          color: '#ccc',
          fontSize: 8,
          formatter: '{value}',
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          const p = params[0];
          return `${p.name}<br/>속도: ${p.value} km/h`;
        },
        axisPointer: { type: 'shadow' },
      },
      series: [
        {
          type: 'bar',
          data: speedData.map(d => d.value),
          barWidth: 25,
          itemStyle: {
            color: 'rgb(255,0,0)',
          },
        },
      ],
    };

    chart.setOption(option);
    window.addEventListener('resize', chart.resize);
    return () => {
      window.removeEventListener('resize', chart.resize);
      chart.dispose();
    };
  }, [speedData]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '150px' }}
    />
  );
}
function CountPitchDistributionStatic() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    const rawData = [
      { name: '슬라이더', value: 3 },
      { name: '체인지업', value: 3 },
      { name: '포심', value: 2 },    // 직구를 포심으로 매핑
      { name: '커브', value: 2 },
    ];

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}회 ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 10,
        textStyle: {
          color: '#fff',         // 레전드도 흰색으로
        },
        data: rawData.map(item => item.name),
      },
      series: [
        {
          name: '피치 분포',
          type: 'pie',
          roseType: 'radius',               // 반지름 가변형 Pie
          radius: ['20%', '60%'],           // 최소/최대 반지름
          center: ['50%', '55%'],
          itemStyle: {
            borderWidth: 0,
          },
          data: rawData.map(item => ({
            ...item,
            itemStyle: {
              color: PITCH_TYPE_COLORS[item.name],
            },
          })),
          label: {
            show: true,
            position: 'outside',
            color: '#fff',                // 텍스트 색상 흰색
            textBorderColor: 'transparent', // 테두리 없앰
            textBorderWidth: 0,            // 테두리 두께 0
            formatter: '{b}\n{c}회',
          },
        },
      ],
    };

    // 4. 옵션 적용
    chart.setOption(option);

    // 5. 리사이즈 대응
    const resizeHandler = () => chart.resize();
    window.addEventListener('resize', resizeHandler);

    // 6. cleanup
    return () => {
      window.removeEventListener('resize', resizeHandler);
      chart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '25vh' }}
    />
  );
}
function FullCountOutcomeRatioChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    // 1) 데이터 카운트
    const todayCounts = { 삼진: 1, 피안타: 1, 볼넷: 1 };
    const past5Counts = { 삼진: 3, 피안타: 4, 볼넷: 5 };

    // 2) 확률(비율) 계산
    const sumToday = Object.values(todayCounts).reduce((a, b) => a + b, 0);
    const sumPast5 = Object.values(past5Counts).reduce((a, b) => a + b, 0);

    const seriesData = ['삼진', '피안타', '볼넷'].map((key) => ({
      name: key,
      today: +(todayCounts[key]    / sumToday).toFixed(2),
      past5: +(past5Counts[key]    / sumPast5).toFixed(2),
    }));

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params) => {
          // params[0] = 삼진, params[1] = 피안타, params[2] = 볼넷
          const name = params[0].axisValue;
          return params
            .map(p => `${p.marker} ${p.seriesName} – ${(p.value * 100).toFixed(0)}%`)
            .join('<br/>');
        }
      },
      legend: {
        // ► legend를 화면 상단 중앙에 가로로 배치
        orient: 'horizontal',
        top: '5%',
        left: 'center',
        itemGap: 20,
        data: ['삼진', '피안타', '볼넷'],
        textStyle: { color: '#fff', fontSize: 14 },
      },
      grid: {
        top: '15%',   // legend 높이만큼 여백 확보
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true,
      },
 
      xAxis: {
        type: 'value',
        max: 1,
        axisLine: { lineStyle: { color: '#aaa' } },
        axisLabel: { formatter: (value) => `${value * 100}%` }
      },
      yAxis: {
        type: 'category',
        data: ['오늘', '시즌'],
        axisLine: { lineStyle: { color: '#aaa' } },
        axisTick: { show: false }
      },
      series: seriesData.map(item => ({
        name: item.name,
        type: 'bar',
        stack: 'total',
        barWidth: '40%',
        data: [ item.today, item.past5 ],
        itemStyle: { color: EVENT_COLORS[item.name] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `${params.value * 100}%`,
          color: '#fff',
          fontWeight: 'bold'
        }
      }))
    };

    chart.setOption(option);
    window.addEventListener('resize', chart.resize);
    return () => {
      window.removeEventListener('resize', chart.resize);
      chart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: 300 }}
    />
  );
}
function BattingGauge({ value = 0.5, title = "타율" }) {
  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [value, "rgb(255,0,0)"],
              [1, "#eeeeee"]
            ]
          }
        },
        pointer: {
          show: true,
          length: "60%",
          width: 6
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          distance: -40,
          fontSize: 12,
          color: "#ffffff",
          formatter: (v) => v.toFixed(1)
        },
        detail: {
          valueAnimation: true,
          fontSize: 18,
          offsetCenter: [0, "40%"],
          formatter: `${value.toFixed(3)}`,
          color: "auto"
        },
        title: {
          offsetCenter: [0, "70%"],
          fontSize: 16,
          color: "#999",
          text: title
        },
        data: [
          {
            value: value,
            name: title
          }
        ]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 200 }} />;
}

function PAResultStackedBar({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const legendNames = data.map((d) => d.name);

  const option = {
    tooltip: {
      trigger: "item",
      formatter: (p) => `${p.name}: ${p.value}개`
    },
    legend: {
      show: true,
      orient: "horizontal",
      left: 0,
      top: "bottom",
      textStyle: {
        color: "#ffffff"
      },
      data: legendNames
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 50,
      top: 30,
      containLabel: true
    },
    xAxis: {
      type: "value",
      max: total,
      show: false
    },
    yAxis: {
      type: "category",
      data: [""],
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: data.map((d) => ({
      name: d.name,
      type: "bar",
      stack: "total",
      label: {
        show: false,
        position: "inside",
        formatter: ({ value }) => `${value}`,  // ✅ name 제거
        fontSize: 12,
        color: "#fff"
      },
      data: [{ value: d.value, name: d.name }]
    }))
  };

  return <ReactECharts option={option} style={{ height: '150px' }} />;
}

export default function Sidebar({ collapsed }) {

  const [chartMode, setChartMode] = useState('batter');  // 'pitcher' or 'batter'
  const [autoUpdate, setAutoUpdate] = useState(true);
  const tabs = ['전력','라인업','중계','영상','득점','현재타석','티빙톡','기록'];
  const innings = Array.from({ length: 9 }, (_, i) => i + 1);
  const currentCount = { ball: 0, strike: 1, out: 2 };

  const lines = [
    { label: 'Ball', count: currentCount.ball, max: 3, colorClass: 'ball' },
    { label: 'Str', count: currentCount.strike, max: 2, colorClass: 'strike' },
    { label: 'Out', count: currentCount.out, max: 2, colorClass: 'out' },
  ];

  const speedData = [
    { name: '오늘 투구', value: 132.6 },
    { name: '직전 투구', value: 140 }
  ];

  return (
    <aside className="sidebar">
      {/* 1. 상단 탭 */}
      <div className="sb-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`sb-tab${tab === '현재타석' ? ' active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 2. 자동 업데이트 섹션 */}
      <div className="sb-auto-update">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={autoUpdate}
            onChange={() => setAutoUpdate(v => !v)}
          />
          <span className="slider" />
        </label>
        <span className="label">자동 업데이트</span>
        <span className="timestamp">최종 업데이트 06.03 14:03</span>
        <div className="actions">
          <button className="icon-btn" aria-label="새로고침">⟳</button>
          <button className="icon-btn" aria-label="공유">⇪</button>
        </div>
      </div>

      {/* 3. 이닝 탭 */}
      <div className="sb-innings">
        {innings.map(i => (
          <button
            key={i}
            className={`inning-btn${i === 5 ? ' active' : ''}`}
          >
            {i}회
          </button>
        ))}
      </div>

      {/* 4. 현재 타석 정보 */}
      {/* 4. 현재 타석 정보 */}
      <div className="sb-current">
        <div className="current-header">5회말 - 롯데 공격</div>
        <div className="current-counts">
          {lines.map(({ label, count, max, colorClass }) => (
            <div key={label} className="count-row">
              <div className="dots">
                {Array.from({ length: max }).map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${colorClass} ${
                      i < count ? 'filled' : 'empty'
                    }`}
                  />
                ))}
              </div>
              <span className="count-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 차트/비주얼 섹션 (플레이스홀더) */}
      <div className="sb-charts">
        {/* — 매치업 박스 시작 — */}
        <div className="matchup-box">
          <div className="player-versus">
            <div className="player-block">
              <img
                src="/kbo_vis/images/ljm.JPG"
                alt="김연주"
                className={chartMode === 'pitcher' ? 'player-photo active' : 'player-photo'}
                onClick={() => setChartMode('pitcher')}

              />
              <div className="player-name">김연주</div>
              <div className="player-stats">투구수 91 | 오늘 구속 132.6km/h</div>
            </div>

            <span className="vs-label">VS</span>

            <div className="player-block">
              <img
                src="/kbo_vis/images/ydh.JPG"
                alt="윤동희"
                className={chartMode === 'batter' ? 'player-photo active' : 'player-photo'}
                onClick={() => setChartMode('batter')}
              />
              <div className="player-name">윤동희</div>
              <div className="player-stats">타율 0.299 | 출루율 0.384</div>
            </div>
          </div>
        </div>
        <div className="chart-content">
          {chartMode === 'pitcher' ? (
            <div className="pitcher-charts">
              {/* 1행: 2열 */}
              <div className="chart-row two-cols">
                <div className="chart-placeholder">금일 스트라이크존 히트맵
                  <StrikeZoneHeatmap csvUrl="/kbo_vis/data/20250603WOLT02025.csv" />
                </div>
                <div className="chart-placeholder">현재 구속 (km/h)
                  <SpeedBarChartECharts speedData={speedData} />
                </div>
              </div>

              {/* 2행: 1열 */}
              <div className="chart-row">
                <div className="chart-placeholder">금일 구종 피칭 결과 분포
                  <PitchResultDistributionChart />
                </div>
              </div>

              {/* 3행: 1열 */}
              <div className="chart-row">
                <div className="chart-placeholder count-pitch">시즌 중 동일 카운트 시 구종 분포
                  <CountPitchDistributionStatic  />
                </div>
              </div>

              {/* 4행: 1열 */}
              <div className="chart-row">
                <div className="chart-placeholder">시즌 중 풀카운트 투구 결과
                  <FullCountOutcomeRatioChart />
                </div>
              </div>
            </div>
          ) : (
            <div className="batter-charts">
              <div className="chart-row two-cols">
                <div className="chart-placeholder">현투수 상대 타율
                  <BattingGauge value={0.500} title="타율" />
                </div>
                <div className="chart-placeholder">현투수 상대 출루율
                  <BattingGauge value={0.667} title="출루율" />
                </div>
              </div>
              <div className="chart-row">
                <div className="chart-placeholder">이전 3 경기 PA 결과
                  <PAResultStackedBar data={pa_data} />
                </div>
              </div>
              <div className="chart-row">
                <div className="chart-placeholder">이전 3 경기 출루율
                  <BattingGauge value={0.583} title="출루율" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
