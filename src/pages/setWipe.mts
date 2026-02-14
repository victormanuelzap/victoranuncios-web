import { wipeEl, WIPE_MS } from "./index.astro.0.mts";

function setWipe(direction) {
// direction: "in" (tapa) o "out" (destapa)
wipeEl.style.transition = "none";
wipeEl.style.clipPath = direction === "in"
? "inset(0 0 0 0)" // tapa todo
: "inset(0 0 0 100%)"; // no tapa (revelado)

requestAnimationFrame(() => {
wipeEl.style.transition = `clip-path ${WIPE_MS}ms cubic-bezier(.2,.9,.2,1)`;
wipeEl.style.clipPath = direction === "in"
? "inset(0 0 0 0)" // tapa
: "inset(0 0 0 100%)"; // destapa desde la derecha
});
}
