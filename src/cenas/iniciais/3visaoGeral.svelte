<script>
  	import { Button } from 'sveltestrap';
    import LayoutVisaoGeral from "../../components/layout/2layoutVisaoGeral.svelte";
    import storeCenas from "../../store/storeCenas";
    import videoIntroducao from './2videoIntroducao.svelte'
    import storeGeral from "../../store/storeGeral";
    import u01Inicio from "../u01Inicio.svelte"

    
</script>

<div>
  <Button
    class="anterior"
    size="lg"
    color="danger"
    on:click={() => ($storeCenas = videoIntroducao)}
>
    Anterior
</Button>
<Button
    class="proximo"
    size="lg"
    color="primary"
    on:click={() => (
      $storeCenas = u01Inicio
      )}
>
    Próximo
</Button>
  </div>

  <LayoutVisaoGeral>
    <span class="objetivo" slot="objetivo">{$storeGeral.objetivo}</span>
    <div slot="roteiro">
      <ol>
        {#each $storeGeral.roteiros as roteiro}
        <li>
          { roteiro.unidade }
        </li>
   
      {/each}
   </ol>
    </div>
  </LayoutVisaoGeral>
