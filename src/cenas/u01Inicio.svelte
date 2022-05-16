<script>
    //ANTERIOR
    import visaoGeral from "./iniciais/3visaoGeral.svelte";
   //PRÓXIMO
   import u01s01i01 from "./u01s01i01.svelte";
   //STORE
   import geralState from "../store/storeGeral";
    import storeCenas from "../store/storeCenas";       
   //LAYOUT
   import LayoutInicioUnidade from "../components/layout/5layoutInicioUnidade.svelte";
   //SVELTESTRAP
       import { Button } from "sveltestrap";
   </script>


<!-- HTML FIXO -->
<div>
    <Button
        class="anterior"
        size="lg"
        color="danger"
        on:click={() => ($storeCenas = visaoGeral)}
    >
        Anterior
    </Button>
    <Button
        class="proximo"
        size="lg"
        color="primary"
        on:click={() => ($storeCenas = u01s01i01)}
    >
        Próximo
    </Button>
</div>

<!-- HTML -->

<LayoutInicioUnidade>
    <span slot="assuntos">{ $geralState.roteiros[1].unidade }</span>    
</LayoutInicioUnidade>

<!-- CSS -->
