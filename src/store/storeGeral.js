import { writable } from "svelte/store";

const geralState = writable({
    disciplina: 'Tráfego Aéreo',
    objetivo: "Interpretar as regras de voo visual e instrumento, bem como as condições para voo visual especial para aeronaves de asas fixas e aeronaves de asas rotativas (helicópteros)",
    roteiros: [
        { unidade: "" },
        { unidade: "1. REGRAS DE VOO" },
        { unidade: "2. REGRAS DE VOO VISUAL" },
        { unidade: "3. REGRAS DE VOO POR INSTRUMENTO" },
        { unidade: "4. REGRAS ESPECIAIS PARA VOOS DE HELICÓPTERO" },
    ]
});

export default geralState