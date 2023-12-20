import { component$, useStore, $ } from '@builder.io/qwik';
import styles from "./views.module.css";


// Define state interface
interface State {
  loading: boolean;
  hashtags: string[];
  error: string | null;
}

// Server-side logic
const API_TOKEN = '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';

async function query(prompt : string) {
  const data = { 
    inputs: prompt,
    parameters: {
      return_full_text: false,
    }
  };
  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
    {
      headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

// Client-side component
export default component$(() => {
  const state = useStore<State>({
    loading: false,
    hashtags: [],
    error: null,
  });

  const fetchHashtags = $(async (word: string) => {
    try {
      const trimmedWord = word.trim();
      if (!trimmedWord || trimmedWord.length > 100) {
        throw new Error("Invalid input. Please enter a valid word.");
      }
  
      state.loading = true;
      const resultArray = await query(`Generate a list of popular and relevant hashtags related to "${trimmedWord}". Focus on trending and widely used hashtags`);
      
      if (resultArray && resultArray.length > 0) {
        const generatedText = resultArray[0].generated_text;
        const hashtagWords = generatedText.split(/\s+/)
                                          .filter((w : string) => w.startsWith('#') && w.length > 1)
                                          .map((tag : string) => tag.toLowerCase());
  
        const hashtagSet = new Set<string>(hashtagWords);
        state.hashtags = Array.from(hashtagSet);
      } else {
        state.hashtags = [];
      }
    } catch (error) {
      state.error = `Error fetching hashtags:`;
    } finally {
      state.loading = false;
    }
  });
  
  

  return (
    <div  class={styles.form} >
      {state.loading && (
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
              await fetchHashtags(target.value);
            }
          }} 
      />
      </div>
      <div>
      <textarea 
          class={styles.myTextarea} 
          value={state.hashtags.join('\n')} // Join hashtags with newlines
        />
      </div>
      {state.error && <p>Error: {state.error}</p>}
    </div>
  );
});