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
      <div>
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
        <button 
          class={styles.fetchButton}
          onClick$={() => fetchAndUpdateHashtags((document.querySelector(`.${styles.wordInput}`) as HTMLInputElement).value)}
        >
          Fetch Hashtags
        </button>
      </div>
      <div>
      <textarea 
          class={styles.myTextarea} 
          value={hashtags.join("\n")}
        />
      </div>
      {error.value && <p>Error: {error}</p>}
    </div>
  );
}); 
