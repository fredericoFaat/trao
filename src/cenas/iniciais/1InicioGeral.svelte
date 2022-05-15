<script>
    import storeCenas from "../../store/storeCenas";
    import geralState from "../../store/storeGeral";
    import videoIntroducao from './2videoIntroducao.svelte';
    import LayoutInicio from "../../components/layout/1LayoutInicioGeral.svelte";
	import { Button } from 'sveltestrap';

</script>


<LayoutInicio>
    <h1 slot="disciplina">{$geralState.disciplina}</h1>
</LayoutInicio>

<Button
    class="proximo"
    size="lg"
    color="primary"
    on:click={() => ($storeCenas = videoIntroducao)}
>
    Próximo
</Button>