<script>
    //ANTERIOR
       import u01s01i01 from "./u01s01i01.svelte";
   //PRÓXIMO
       import u01s01i03 from "./u01s01i03.svelte";
   //STORE
       import storeCenas from "../store/storeCenas";
   //LAYOUT
       import LayoutSlideA from "../components/layout/7layout1R1C.svelte";
   //SVELTESTRP
       import { Button } from "sveltestrap";
   </script>

<!-- HTML FIXO -->
<div>
    <Button
        class="anterior"
        size="lg"
        color="danger"
        on:click={() => ($storeCenas = u01s01i01)}
    >
        Anterior
    </Button>
    <Button
        class="proximo"
        size="lg"
        color="primary"
        on:click={() => ($storeCenas = u01s01i03)}
    >
        Próximo
    </Button>
</div>

<!-- HTML PILOTINHO -->
<LayoutSlideA>
    <div slot="parte1">
        <p>PILOTINHO</p>
        <ul>
            <li>REGRAS DE VOO VISUAL</li>
            <li>REGRAS DE VOO POR INSTRUMENTOS</li>
        </ul>
    </div>
</LayoutSlideA>

<!-- CSS -->
<style>
</style>
