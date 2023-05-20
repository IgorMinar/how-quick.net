import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./timer.module.css";
import Gauge from "../gauge";
import { useStore } from "@builder.io/qwik";

export default component$(() => {
  const duration = useSignal(0);
  const rawPerfResults = useStore<Array<Omit<PerformanceEntry, "toJSON">>>([]);
  //const colo = ${request.cf.colo};

  useVisibleTask$(
    () => {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          rawPerfResults.push(entry);
          duration.value = entry.duration;
        });
      });

      observer.observe({ entryTypes: ["navigation"] });
    },
    { strategy: "document-ready" }
  );

  return (
    <div class={styles["counter-wrapper"]}>
      {/* <button class="button-dark button-small" onClick$={() => setCount(count.value - 1)}>
        -
      </button> */}
      <Gauge value={duration.value} />
      {/* <button class="button-dark button-small" onClick$={() => setCount(count.value + 1)}>
        +
      </button> */}
    </div>
  );
});
