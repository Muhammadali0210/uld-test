<template>
  <div class="w-full bg-white">
    <div ref="chartEl" class="w-full h-[420px]"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, defineExpose } from "vue";
import * as echarts from "echarts";
import { driverLogs, type EventLog } from "./data1";
import dayjs from "dayjs";

function parseToMs(s: string) {
  if (!s) return NaN;
  // if string contains timezone info (Z or +/-HH:MM) -> use Date parse
  if (/[zZ]$|[+-]\d{2}:?\d{2}$/.test(s)) {
    return new Date(s).getTime();
  }
  // Otherwise treat as local: "YYYY-MM-DDTHH:mm:ss" => new Date(year, month-1, day, hh, mm, ss)
  const [datePart, timePart = "00:00:00"] = s.split(/[T ]/);
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh = 0, mm = 0, ss = 0] = timePart.split(":").map((v) => Number(v));
  return new Date(y, m - 1, d, hh || 0, mm || 0, Math.floor(ss || 0)).getTime();
}

const STATUS_ORDER = ["On Duty", "Driving", "Sleeper", "Off Duty"] as const;
const statusToValue = (s: string) => STATUS_ORDER.indexOf(s as any);
const valueToLabel = (v: number) => STATUS_ORDER[v] ?? String(v);

const chartEl = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

// sort events
const events = driverLogs.slice().sort((a, b) => parseToMs(a.start) - parseToMs(b.start));

// compute min/max day boundaries (ms)
const minTimeMs = (() => {
  const min = Math.min(...events.map(e => parseToMs(e.start)));
  const dt = new Date(min);
  dt.setHours(0, 0, 0, 0);
  return dt.getTime();
})();
const maxTimeMs = (() => {
  const max = Math.max(...events.map(e => parseToMs(e.end)));
  const dt = new Date(max);
  dt.setHours(23, 59, 59, 999);
  return dt.getTime();
})();

// build step points (use numeric ms)
function buildStepPoints(evts: EventLog[]) {
  const pts: [number, number][] = [];
  if (!evts.length) return pts;
  const list = evts.slice().sort((a, b) => parseToMs(a.start) - parseToMs(b.start));

  // start with day's start and first status
  pts.push([minTimeMs, statusToValue(list[0].type)]);

  for (let i = 0; i < list.length; i++) {
    const e = list[i];
    const val = statusToValue(e.type);
    const sMs = parseToMs(e.start);
    const tMs = parseToMs(e.end);

    const last = pts[pts.length - 1];
    // if there is a gap between last timestamp and this start, keep flat
    if (last && last[0] < sMs) {
      pts.push([sMs, last[1]]);
    }
    // vertical jump at start
    pts.push([sMs, val]);
    // flat until end
    pts.push([tMs, val]);

    // ensure continuity to next start (if next start > end)
    if (i < list.length - 1) {
      const nextStart = parseToMs(list[i + 1].start);
      if (nextStart > tMs) {
        pts.push([nextStart, val]);
      }
    }
  }

  // final ensure last covers maxTimeMs
  const last = pts[pts.length - 1];
  if (last && last[0] < maxTimeMs) pts.push([maxTimeMs, last[1]]);

  return pts;
}

const stepPoints = buildStepPoints(events);

// build rest markAreas (use ms)
function buildRestMarkAreas(evts: EventLog[]) {
  const areas: any[] = [];
  for (const e of evts) {
    if (e.type === "Off Duty" || e.type === "Sleeper") {
      areas.push([{ xAxis: parseToMs(e.start) }, { xAxis: parseToMs(e.end) }]);
    }
  }
  return areas;
}
const restAreas = buildRestMarkAreas(events);

// labels (duration text) positions (ms + y value)
function formatDurationMs(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.round((ms % 3600000) / 60000);
  return `${h > 0 ? h + "h " : ""}${m}m`;
}
const labels = events.map(e => {
  const s = parseToMs(e.start), t = parseToMs(e.end);
  return {
    x: Math.floor((s + t) / 2),
    y: statusToValue(e.type),
    duration: formatDurationMs(t - s),
    rawStart: e.start,
    rawEnd: e.end
  };
});

const optionBase: echarts.EChartsOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "cross" },
    formatter: (params: any) => {
      const p = params && params[0];
      const timeMs = p && (p.value && (Array.isArray(p.value) ? p.value[0] : p.value));
      const d = new Date(timeMs);
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      // find event
      const found = events.find(ev => parseToMs(ev.start) <= timeMs && parseToMs(ev.end) >= timeMs);
      const label = valueToLabel(p && p.value ? (Array.isArray(p.value) ? p.value[1] : p.value) : 0);
      const dur = found ? formatDurationMs(parseToMs(found.end) - parseToMs(found.start)) : "-";
      return `<b>${label}</b><br/>${hh}:${mm}<br/>Duration: ${dur}`;
    }
  },
  grid: { left: 30, right: 20, top: 20, bottom: 10, containLabel: true },
  xAxis: {
    type: "time",
    min: minTimeMs,
    max: maxTimeMs,
    interval: 60 * 60 * 1000,
    minInterval: 60 * 60 * 1000,
    maxInterval: 60 * 60 * 1000,
    axisLabel: {
      formatter: (val: number) => {
        const d = dayjs(val);
        const h = d.hour();
        const m = d.minute();

        if (h === 0 && m === 0) {
          return d.format("DD-MMM");
        }
        if (h === 12 && m === 0) {
          return "N";
        }
        return String(h);
      }
    },
    splitLine: {
      show: true
    },
    minorTick: { show: false },
    minorSplitLine: { show: false },
  },
  yAxis: {
    type: 'category',
    data: [
      'Off duty',
      'Sleeper',
      'Driver',
      'On duty',
    ],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#000000',
      fontWeight: 'bold'  
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    }
  },
  // dataZoom: [
  //   { type: "inside", start: 0, end: 100 },
  //   { type: "slider", start: 0, end: 100, bottom: 10 }
  // ],
  dataZoom: [],
  series: [
    {
      name: "Status",
      type: "line",
      step: "end",
      showSymbol: false,
      data: stepPoints.map(p => [p[0], p[1]]),
      lineStyle: { color: "#113685", width: 4 },
      markArea: {
        silent: true,
        itemStyle: { color: "rgba(34,197,94,0.08)" },
        data: restAreas
      }
    }
  ]
};

// Debug: print parsing results (helps find offset cause)
// console.group("Parsed times:");
events.forEach(e => {
  const sMs = parseToMs(e.start), tMs = parseToMs(e.end);
  const sIso = new Date(sMs).toISOString();
  const sLocal = new Date(sMs).toString();
  const sHours = new Date(sMs).getHours();
  const tzOffsetMin = new Date(sMs).getTimezoneOffset();
  // console.log(`${e.start} -> ms:${sMs}, ISO:${sIso}, Local:${sLocal}, getHours:${sHours}, tzOffsetMin:${tzOffsetMin}`);
});
// console.groupEnd();

onMounted(() => {
  nextTick(() => {
    if (!chartEl.value) return;
    chart = echarts.init(chartEl.value);
    chart.setOption(optionBase);

    // After render finished, add duration labels using convertToPixel safely
    chart.on("finished", () => {
      try {
        const graphics = labels.map(lbl => {
          // convertToPixel expects coord inside grid: [x, y]
          const pixel = chart!.convertToPixel("grid", [lbl.x, lbl.y]);
          const left = (pixel && pixel[0]) || 0;
          const top = (pixel && pixel[1]) || 0;
          return {
            type: "text",
            left,
            top: top - 14,
            style: {
              text: lbl.duration,
              fill: "#374151",
              fontSize: 10
            }
          };
        });
        chart!.setOption({ graphic: graphics });
      } catch (err) {
        console.warn("convertToPixel/graphic error:", err);
      }
    });

    // responsive
    window.addEventListener("resize", () => chart && chart.resize());
  });
});

function focusOnTime(isoTime: string) {
  if (!chart) return;
  const t = parseToMs(isoTime);
  const start = minTimeMs;
  const end = maxTimeMs;
  const span = end - start;
  const windowPerc = 20;
  let centerPerc = ((t - start) / span) * 100;
  let newStart = centerPerc - windowPerc / 2;
  if (newStart < 0) newStart = 0;
  if (newStart + windowPerc > 100) newStart = 100 - windowPerc;
  const newEnd = newStart + windowPerc;
  chart.setOption({ dataZoom: [{ start: newStart, end: newEnd }, { start: newStart, end: newEnd }] });
  chart.setOption({ series: [{ markLine: { symbol: "none", lineStyle: { color: "#0ea5e9", width: 2 }, data: [{ xAxis: t }] } }] });
  chart.dispatchAction({ type: "showTip", x: t });
}

defineExpose({ focusOnTime });
</script>

<style scoped>
/* nothing special */
</style>
