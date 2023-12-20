import { component$ } from "@builder.io/qwik";
import styles from "./hero.module.css";
import ImgThunder from "~/media/thunder.png?jsx";

export default component$(() => {
  return (
    <div class={["container", styles.hero]}>
      <ImgThunder class={styles["hero-image"]} />
      <h1>
        Generate <span class="highlight">#</span>
        <br />
        Fastly <span class="highlight">to your</span> Posts
      </h1>
      <p>generating hashtags using AI</p>
      <div class={styles["button-group"]}>
        <a href="#target-div" class={styles.alink}>
          <button>
          GENERATE HASHTAGS
          </button>
        </a>
      </div>
    </div>
  );
});
