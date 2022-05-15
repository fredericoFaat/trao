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
 //SVELTESTRP
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
  <h1 slot="assuntos">{ $geralState.roteiros[1]["unidade"] }</h1>
  <h2 slot="unidade">UNIDADE 1</h2>
</LayoutInicioUnidade>

<!-- CSS -->
