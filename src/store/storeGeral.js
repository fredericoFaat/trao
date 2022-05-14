import { writable } from "svelte/store";

const geralState = writable({
    disciplina: 'Tráfego Aéreo',
    objetivo: "Conhecer as principais funções do Blender na elaboração de Objetos de Aprendizagem",
    roteiros: [
        { unidade: "" },
        { unidade: "1. REGRAS DE VOO" },
        { unidade: "2. REGRAS DE VOO VISUAL" },
        { unidade: "3. REGRAS DE VOO POR INSTRUMENTO" },
        { unidade: "4. REGRAS ESPECIAIS PARA VOOS DE HELICÓPTERO" },
    ]
});

export default geralState