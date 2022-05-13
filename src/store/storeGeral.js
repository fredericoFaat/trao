import { writable } from "svelte/store";

const geralState = writable({
    disciplina: 'Tráfego Aéreo',
    objetivo: "Conhecer as principais funções do Blender na elaboração de Objetos de Aprendizagem",
    roteiros: [
        { unidade: "" },
        { unidade: "1. O que é o Blender" },
        { unidade: "2. Principais funções" },
        { unidade: "3. Primeiro Projeto" },
        { unidade: "4. Segundo Projeto" },
        { unidade: "5. Terceiro Projeto" },
        { unidade: "6. Quarto Projeto" },
        { unidade: "7. Quinto Projeto" },
        { unidade: "8. Sexto Projeto" },
        { unidade: "9. Sétimo Projeto" },
        { unidade: "10. Oitavo Projeto" },
    ]
});

export default geralState