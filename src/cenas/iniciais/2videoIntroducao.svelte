<script>
    //ANTERIOR
    import inicioGeral from "./1InicioGeral.svelte";
    //PRÓXIMO
    import visaoGeral from "./3visaoGeral.svelte";
    //SVELTE
    import storeCenas from "../../store/storeCenas";
    import LayoutVideoTelaCheia from "../../components/layout/8layoutVideoTelaCheia.svelte";
    import { Button } from "sveltestrap";

    let paused = true;
</script>

<!-- HTML FIXO -->
<div>
    <Button
        class="anterior"
        size="lg"
        color="danger"
        on:click={() => ($storeCenas = inicioGeral)}
    >
        Anterior
    </Button>
    <Button
        class="proximo"
        size="lg"
        color="primary"
        on:click={() => ($storeCenas = visaoGeral)}
    >
        Próximo
    </Button>
</div>

<!-- HTML-->
<LayoutVideoTelaCheia>
    <div slot="parte1">
        <!-- svelte-ignore a11y-media-has-caption -->
        <video autoplay bind:paused>
            <source src="../assets/videos/intro.webm" type="video/webm" />
            Your browser does not support HTML5 video.
        </video>

        <div class="content">
            <h1>Vídeo de Introdução TRAO</h1>
            <p>Principais assuntos que serão abordados na disciplina.</p>
            <Button
                on:click={() => {
                    paused = !paused;
                }}
            >
                {#if paused}
                    Play
                {:else}
                    Pausar
                {/if}</Button
            >
        </div>
    </div>
</LayoutVideoTelaCheia>

<style>
    video {
        position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%;
        min-height: 100%;
    }

    .content {
        position: fixed;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        color: #f1f1f1;
        width: 100%;
        padding: 20px;
    }
</style>