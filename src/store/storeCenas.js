import { writable } from "svelte/store";

import inicioGeral from "../cenas/iniciais/1InicioGeral.svelte"

const cenas = writable(inicioGeral);

export default cenas