import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Timer from "~/components/starter/timer/timer";
import Hero from "~/components/starter/hero/hero";
//import Infobox from "~/components/starter/infobox/infobox";
//import Starter from "~/components/starter/next-steps/next-steps";

export default component$(() => {
  return (
    <>
      <Hero />
      <Timer />
    </>
  );
});

export const head: DocumentHead = {
  title: "how-quick.net",
  meta: [
    {
      name: "description",
      content: "How quick is your Web?",
    },
  ],
};
