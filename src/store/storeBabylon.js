import { writable } from "svelte/store";

const babylonStore = writable({
    engine: null,
    canvas: null
});

export default babylonStore