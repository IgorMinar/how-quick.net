import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./timer.module.css";
import Gauge from "../gauge";
//import { useStore } from "@builder.io/qwik";

export default component$(() => {
  const duration = useSignal(0);
  //const rawPerfResults = useStore<Array<Omit<PerformanceEntry, "toJSON">>>([]);
  //const colo = ${request.cf.colo};

  useVisibleTask$(
    () => {
      // this doesn't work for some reason
      // "nagivation" event is never delivered, only "resource" events
      // const observer = new PerformanceObserver((list) => {
      //   list.getEntries().forEach((entry) => {
      //     console.log(entry.entryType, entry.toJSON());
      //     rawPerfResults.push(entry);
      //     //if (entry.entryType === "navigation") {
      //     if (!duration.value) {
      //       duration.value = entry.duration;
      //     }
      //   });
      // });
      // observer.observe({ entryTypes: ["navigation", "resource"] }); // why doesn't 'navigation' work here?

      duration.value = performance.getEntriesByType("navigation")[0].duration;
    },
    { strategy: "document-idle" }
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
