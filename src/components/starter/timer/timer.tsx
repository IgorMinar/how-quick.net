import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import styles from "./timer.module.css";
import Gauge from "../gauge";
import { useServerInfoLoader } from "~/routes/layout";

export type PerformanceEntryObject = Omit<PerformanceEntry, "toJSON">;

export default component$(() => {
  const navigationTimingResult = useSignal<PerformanceEntryObject | null>(null);
  const serverInfo = useServerInfoLoader();

  const processNavigationEntry$ = $(function (navigationEntry?: PerformanceEntry) {
    if (navigationEntry?.duration && navigationTimingResult.value === null) {
      navigationTimingResult.value = navigationEntry;
    } else {
      if (navigationTimingResult && navigationTimingResult.value?.duration !== navigationEntry?.duration) {
        console.error(
          "hqn: New navigation entry captured with a conflicting value! current:",
          navigationTimingResult.value,
          "new:",
          navigationEntry?.toJSON()
        );
      } else {
        console.error("hqn: Incomplete navigation entry with duration=0");
      }
    }
  });

  useVisibleTask$(
    () => {
      const observer = new PerformanceObserver((list) => {
        const navigationEntry = list.getEntries().at(-1);
        processNavigationEntry$(navigationEntry);
      });

      // we must start observing before Document load event fires, otherwise we don't capture the entry
      observer.observe({ entryTypes: ["navigation"] });
    },
    { strategy: "document-ready" }
  );

  useVisibleTask$(
    () => {
      // for some reason that is unclear to me, the navigation entry is not reliably picked up in some scenarios
      // without this document-idle callback, that's why we try to extract the value twice.
      processNavigationEntry$(performance.getEntriesByType("navigation").at(-1));
    },
    { strategy: "document-idle" }
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
