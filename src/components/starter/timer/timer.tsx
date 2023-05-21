import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./timer.module.css";
import Gauge from "../gauge";
import { useServerInfoLoader } from "~/routes/layout";

export type PerformanceEntryObject = Omit<PerformanceEntry, "toJSON">;

export default component$(() => {
  const navigationTimingResult = useSignal<PerformanceEntryObject | null>(null);
  const serverInfo = useServerInfoLoader();

  useVisibleTask$(
    () => {
      const observer = new PerformanceObserver((list) => {
        const navigationEntry = list.getEntries().at(-1);
        if (navigationEntry?.duration) {
          navigationTimingResult.value = navigationEntry;
        } else {
          console.log("incomplete navigation entry with duration=0");
        }
      });

      observer.observe({ entryTypes: ["navigation"] });
    },
    { strategy: "document-ready" }
  );

  return (
    <>
      <div class={styles["timer-wrapper"]}>
        <Gauge perfEntry={navigationTimingResult.value} />
        <span>
          served {serverInfo.value.hot ? "🔥" : "❄️"} from{" "}
          <a href="https://www.cloudflare.com/network/">{serverInfo.value.colo}</a>
        </span>
      </div>
      <p class={styles["whats-this"]}>
        We used a full-stack application to measured the{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Navigation_and_resource_timings#duration:~:text=Copy%20to%20Clipboard-,Duration,-We%20are%20provided">
          end-to-end latency
        </a>{" "}
        of your Web experience...
      </p>
    </>
  );
});
