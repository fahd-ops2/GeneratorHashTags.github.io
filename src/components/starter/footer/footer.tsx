import { component$ } from "@builder.io/qwik";
import styles from "./footer.module.css";

export default component$(() => {
  return (
    <footer>
      <div class="container">
        <a href="#" target="_blank" class={styles.anchor}>
          <span>#Generator</span>
          <span class={styles.spacer}>|</span>
          <span>2024</span>
        </a>
      </div>
    </footer>
  );
});
