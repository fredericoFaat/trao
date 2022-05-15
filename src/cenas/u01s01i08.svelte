<script>
    import storeCenas from "../store/storeCenas";

    import scene1 from "./u01s01i01.svelte";
    import scene3 from "./u01s01i03.svelte";

    import LayoutSlideA from "../components/layout/7layout1R1C.svelte";
    import { Button } from "sveltestrap";
</script>

<!-- HTML FIXO -->
<div>
    <Button
        class="anterior"
        size="lg"
        color="danger"
        on:click={() => ($storeCenas = scene1)}
    >
        Anterior
    </Button>
    <Button
        class="proximo"
        size="lg"
        color="primary"
        on:click={() => ($storeCenas = scene3)}
    >
        Próximo
    </Button>
</div>

<!-- HTML -->
<LayoutSlideA>
    <div slot="parte1">
        <h1>CRITÉRIOS GERAIS</h1>
        <p>
          XXXXX
        </p>
        <p>Elementos para limites visuais:</p>
        <ul>
            <li>- Visibilidade mínima</li>
            <li>- Velocidade máxima</li>
            <li>- Altitude ou altura mínima e máxima</li>
        </ul>
    </div>
</LayoutSlideA>

<!-- CSS -->
<style>
</style>
