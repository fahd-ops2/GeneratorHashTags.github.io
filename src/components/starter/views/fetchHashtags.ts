import  { $, Signal } from '@builder.io/qwik';

const API_TOKEN = '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';

export const fetchHashtags = $(async (word: string, loading : Signal<boolean>, error : Signal<string>) => {
    
    let hashtags : string[] = [];
    try {
      const trimmedWord = word.trim();
      if (!trimmedWord || trimmedWord.length > 100) {
        throw new Error("Invalid input. Please enter a valid word.");
      }
      loading.value = true;
      const resultArray = await query(`Generate a list of popular and relevant hashtags related to "${trimmedWord}". Focus on trending and widely used hashtags`);
      if (resultArray && resultArray.length > 0) {
        const generatedText = resultArray[0].generated_text;
        const hashtagWords = generatedText.split(/\s+/)
                                          .filter((w: string) => w.startsWith('#') && w.length > 1)
                                          .map((tag: string) => tag.toLowerCase());
  
        const hashtagSet = new Set<string>(hashtagWords);
        hashtags = Array.from(hashtagSet);
        console.log(hashtags)
      } else {
        hashtags = [];
      }
    } catch (err) {
      error.value = "Error fetching hashtags";
    } finally {
      loading.value = false;
    }
    return hashtags;
  });

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