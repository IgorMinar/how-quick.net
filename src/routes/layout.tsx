import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

//import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";

import styles from "./styles.css?inline";

export const useServerInfoLoader = routeLoader$((requestEvent) => {
  //TODO: fix typing
  const hot = (globalThis as any).ARE_YOU_HOT ?? false;
  (globalThis as any).ARE_YOU_HOT = true;

  return {
    date: new Date().toISOString(),
    //TODO: fix typing
    colo: (requestEvent.request as any).cf?.colo,
    hot,
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      {/* <Header /> */}
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
