import { component$, useStore, useSignal, $ } from '@builder.io/qwik';
import styles from "./views.module.css";
import { fetchHashtags } from './fetchHashtags';

export default component$(() => {
  const loading = useSignal(false);
  const error = useSignal<string>('');
  const hashtags = useStore<string[]>([]);

  const fetchAndUpdateHashtags = $(async (word: string) => {
    const fetchedHashtags: string[] = await fetchHashtags(word, loading, error);
    hashtags.length = 0;
    hashtags.push(...fetchedHashtags);
  });

  return (
    <div  class={styles.form} >
      {loading.value && (
        <div class={styles.spinnerContainer}>
          <div class={styles.loader}></div>
        </div>
      )}
      <div class={styles.inputContainer}>
        <input
          type="text"
          class={styles.wordInput}
          placeholder="Enter a word"
          onKeyUp$={async (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
              fetchAndUpdateHashtags((event.target as HTMLInputElement).value);
            }
          }}
        />
        <button class={styles.iconButton} onClick$={() => console.log("add")}>
          <i class={`fa-solid fa-plus`} />
        </button>
        <button class={styles.iconButton} onClick$={() => fetchAndUpdateHashtags((document.querySelector(`.${styles.wordInput}`) as HTMLInputElement).value)}>
          <i class={`fa-solid fa-magnifying-glass`} />
        </button>
      </div>
      <div>
        <textarea class={styles.myTextarea} value={hashtags.join("\n")} />
      </div>
      {error.value && <p>Error: {error}</p>}
    </div>
  );
}); 
