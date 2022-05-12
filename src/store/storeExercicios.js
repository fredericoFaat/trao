import { writable } from "svelte/store";

const questoes = writable([
    {
        questao:
            "Which of the following special symbol allowed in a variable name?",
        opcoes: [
            "* (asterisk)",
            "| (pipeline)",
            "- (hyphen)",
            "_ (underscore)",
        ],
        indexCorreto: 3,
    },
    {
        questao:
            "Which of the following correctly shows the hierarchy of arithmetic operations in C?",
        opcoes: ["/ + * -", "* - / +", "+ - / *", "/ * + -"],
        indexCorreto: 3,
    },
    {
        questao:
            "Which header file should be included to use functions like malloc() and calloc()?",
        opcoes: ["memory.h", "stdlib.h", "string.h", "dos.h"],
        indexCorreto: 1,
    },
    {
        questao:
            "Which bitwise operator is suitable for turning off a particular bit in a number?",
        opcoes: ["&& operator", "& operator", "|| operator", "! operator"],
        indexCorreto: 1,
    },
    {
        questao:
            "What function should be used to free the memory allocated by calloc() ?",
        opcoes: [
            "dealloc();",
            "malloc(variable_name, 0)",
            "free();",
            "memalloc(variable_name, 0)",
        ],
        indexCorreto: 2,
    },
]
);

export default questoes