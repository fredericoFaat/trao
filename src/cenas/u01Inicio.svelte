<script>
    import { Button } from "sveltestrap";
    import geralState from "../store/storeGeral";
    import storeCenas from "../store/storeCenas";
    import visaoGeral from "./iniciais/3visaoGeral.svelte";
    import scene1 from "./u01s01i01.svelte";
    import LayoutInicioUnidade from "../components/layout/5layoutInicioUnidade.svelte";
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
        on:click={() => ($storeCenas = scene1)}
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
