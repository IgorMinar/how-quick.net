import { component$ } from "@builder.io/qwik";
import styles from "./gauge.module.css";
import type { PerformanceEntryObject } from "../timer/timer";

export default component$(({ perfEntry }: { perfEntry: PerformanceEntryObject | null }) => {
  const duration = Math.round(perfEntry?.duration ?? 0);

  return (
    <div class={styles.wrapper}>
      <svg viewBox="0 0 120 120" class={styles.gauge}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#18B6F6" />
            <stop offset="1000%" stop-color="#AC7FF4" />
          </linearGradient>
        </defs>

        <circle r="56" cx="60" cy="60" stroke-width="8" style="fill: #000; stroke: #0000"></circle>

        <circle
          r="56"
          cx="60"
          cy="60"
          stroke-width="8"
          style={`transform: rotate(-87.9537deg); stroke-dasharray: ${
            duration * 3.51
          }, 351.858; fill:none; transform-origin:50% 50%; stroke-linecap:round; stroke:url(#gradient)`}
        ></circle>
      </svg>
      <div class={styles.value}>
        {duration || "…"}
        <span class={styles.unit}>ms</span>
      </div>
    </div>
  );
});
