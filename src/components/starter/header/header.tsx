import { component$ } from "@builder.io/qwik";
import styles from "./header.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/">
            #Generator
          </a>
        </div>
        <ul>
          <li>
            <a href="/">
              home
            </a>
          </li>
          <li>
            <a href="#target-div">
              generate
            </a>
          </li>
          <li>
            <a href="#">
              login
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
});
