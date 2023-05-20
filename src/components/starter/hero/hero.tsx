import { component$ } from "@builder.io/qwik";
import styles from "./hero.module.css";

export default component$(() => {
  return (
    <div class={styles.hero}>
      <h1>
        How <span class="highlight">quick</span>
        <br />
        is your <span class="highlight">Web</span>?
      </h1>
      <p>
        We used a full-stack application to measured the{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Navigation_and_resource_timings#duration:~:text=Copy%20to%20Clipboard-,Duration,-We%20are%20provided">
          end-to-end latency
        </a>{" "}
        of your Web experience...
      </p>
    </div>
  );
});
