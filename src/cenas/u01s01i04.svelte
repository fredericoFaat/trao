<script>
    //ANTERIOR
       import u01s01i03 from "./u01s01i03.svelte";
   //PRÓXIMO
       import u01s01i05 from "./u01s01i05.svelte";
   //STORE
       import storeCenas from "../store/storeCenas";
   //LAYOUT
       import LayoutSlideA from "../components/layout/7layout1R1C.svelte";
   //SVELTESTRAP
       import { Button } from "sveltestrap";
   </script>

<!-- HTML FIXO -->
<div>
    <Button
        class="anterior"
        size="lg"
        color="danger"
        on:click={() => ($storeCenas = u01s01i03)}
    >
        Anterior
    </Button>
    <Button
        class="proximo"
        size="lg"
        color="primary"
        on:click={() => ($storeCenas = u01s01i05)}
    >
        Próximo
    </Button>
</div>

<!-- HTML TABELA 1-->
<LayoutSlideA>
    <div slot="parte1">
        <p>
            As condições abaixo deverão ser cumpridas simultaneamente e
            continuamente:
        </p>
        <ul>
            <li>
                - Manter referência com o solo ou água, de modo que as formações
                meteorológicas abaixo do nível de voo não obstruam mais da
                metade da área de visão do piloto;
            </li>
            <li>- Voar abaixo do nível de voo 150 (FL 150);</li>
            <li>- Voar com velocidade estabelecida na seguinte tabela:</li>
        </ul>
    </div>
</LayoutSlideA>

<!-- CSS -->
<style>
</style>
