import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Hero from "~/components/starter/hero/hero";
import Views from "~/components/starter/views/views";

export default component$(() => {
  return (
    <>
      <Hero />
      <div class="container container-flex" id="target-div">
        <Views />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to #Generator",
  meta: [
    {
      name: "description",
      content: "#Generator site description",
    },
  ],
};
