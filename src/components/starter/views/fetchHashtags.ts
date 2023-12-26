import { server$ } from '@builder.io/qwik-city';

const API_TOKEN = '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';

export const fetchHashtags = server$(async (word: string) => {
    
    let hashtagWords : string[] = [];
    const trimmedWord = word.trim();
    if (!trimmedWord || trimmedWord.length > 100) {
      throw new Error("Invalid input. Please enter a valid word.");
    }
    const resultArray = await query(`Generate a list of popular and relevant hashtags related to "${trimmedWord}". Focus on trending and widely used hashtags`);
    if (resultArray && resultArray.length > 0) {
      const generatedText = resultArray[0].generated_text;
      hashtagWords = generatedText.split(/\s+/)
                                        .filter((w: string) => w.startsWith('#') && w.length > 1)
                                        .map((tag: string) => tag.toLowerCase());
    } else {
      hashtagWords = [];
    }
    return hashtagWords;
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