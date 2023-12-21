import { component$, useStore, useSignal } from '@builder.io/qwik';
import styles from "./views.module.css";
import { fetchHashtags } from './fetchHashtags';

export default component$(() => {
  const loading = useSignal(false);
  const error = useSignal<string>();
  const hashtags = useStore<string[]>([]);

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
              const target = event.target as HTMLInputElement;
              const fetchedHashtags: string[] = await fetchHashtags(target.value, loading, error);
              hashtags.push(fetchedHashtags);
            }
          }} 
      />
      </div>
      <div>
      <textarea 
          class={styles.myTextarea} 
          value={hashtags.join("/n")}
        />
      </div>
      {error.value && <p>Error: {error}</p>}
    </div>
  );
}); 
