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
    </div>
  );
});
