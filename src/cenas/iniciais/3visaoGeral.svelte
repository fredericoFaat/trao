<script>
  	import { Button } from 'sveltestrap';
    import LayoutVisaoGeral from "../../components/layout/2layoutVisaoGeral.svelte";
    import storeCenas from "../../store/storeCenas";
    import videoIntroducao from './2videoIntroducao.svelte'
    import storeGeral from "../../store/storeGeral";
    import u01Inicio from "../u01Inicio.svelte"
    import u02Inicio from "../u02Inicio.svelte"
    import u03Inicio from "../u03Inicio.svelte"
    
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
    <div slot="unidades">
      <ol>       
        <li>
          <Button
          class="unidadesItem"
          size="lg"
          color="primary"
          on:click={() => ($storeCenas = u01Inicio)}>
          { $storeGeral.roteiros[1].unidade }
          </Button>
        </li>
        <li>
          <Button
          class="unidadesItem"
          size="lg"
          color="primary"
          on:click={() => ($storeCenas = u02Inicio)}>
          { $storeGeral.roteiros[2].unidade }
          </Button>
        </li>
        <li>
          <Button
          class="unidadesItem"
          size="lg"
          color="primary"
          on:click={() => ($storeCenas = u03Inicio)}>
          { $storeGeral.roteiros[3].unidade }
          </Button>
        </li>
   </ol>
    </div>
  </LayoutVisaoGeral>
