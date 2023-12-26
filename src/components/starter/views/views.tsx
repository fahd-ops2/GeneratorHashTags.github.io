import { component$, useStore, useSignal, $ } from '@builder.io/qwik';
import type { Signal } from '@builder.io/qwik';
import styles from "./views.module.css";
import { fetchHashtags } from './fetchHashtags';
import ModalAlert from '../modal/modal';

export default component$(() => {

  const loading = useSignal(false);
  const error = useSignal<string>('');
  const hashtags = useStore<string[]>([]);
  const words = useStore<string[]>([]);
  const showSig = useSignal(false);

  const handleClick = $(() => {
    const inputElement = document.getElementById("inputWords") as HTMLInputElement | null;
    if (inputElement != null && inputElement.value != "" && !words.includes(inputElement.value) && words.length<3) {
      words.push(inputElement.value);
      inputElement.value = "";
    }
  });

  const removeValue = $((valueToRemove: string) => {
      const updatedWords = words.filter((word : string) => word !== valueToRemove);
      words.length = 0;
      updatedWords.forEach(word => words.push(word));
    }
  );

  const fetchAndUpdateHashtags = $( async (wordsList: string[],loading: Signal<boolean>, error: Signal<string>) => {
    try {
      loading.value = true;
      hashtags.length = 0;
      await Promise.all(wordsList.map(async (word) => {
        const fetchedHashtags: string[] = await fetchHashtags(word);
        hashtags.push(...fetchedHashtags);
      }));
    } catch(err){
      error.value = "error"
    } finally {
      loading.value = false;
      const inputElement = document.getElementById("inputWords") as HTMLInputElement | null;
      if (inputElement) {
        inputElement.value = "";
      }
      words.length = 0;
    }
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
          id='inputWords'
          class={styles.wordInput}
          placeholder="Enter a word"
          onKeyUp$={async (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
              fetchAndUpdateHashtags(words,loading,error);
            }
          }}
        />
        <button class={styles.iconButton} onClick$={() => handleClick()}>
          <i class={`fa-solid fa-plus`} />
        </button>
        <button class={styles.iconButton} onClick$={() => fetchAndUpdateHashtags(words,loading,error)}>
          <i class={`fa-solid fa-magnifying-glass`} />
        </button>
      </div>
      <div class={styles.words}>
        {words && words.map((word, index) => (
          <button
            key={index}
            class={styles.iconButton}
          >
            <span>{word}</span>
            <i class={`fa-solid fa-xmark`} onClick$={() => removeValue(word)}/>
          </button>
        ))}
      </div>
      <div>
        <textarea class={styles.myTextarea} value={hashtags.join("\n")} readOnly/>
      </div>
      {error.value && <p>Error: {error.value}</p>} {/* Fixed to display error message */}
      <button onClick$={() => (showSig.value = true)} class="hover:bg-accent/80 rounded-md border px-3 py-2">
        Open Modal
      </button>
      <ModalAlert show={showSig}/>
    </div>
  );
});