<script>
    import storeCenas from "../../store/storeCenas";
    import visaoGeral from "./3visaoGeral.svelte";
    import LayoutVideoTelaCheia from "../../components/layout/8layoutVideoTelaCheia.svelte";
    import { Button } from "sveltestrap";

    let paused = true;
    
</script>


<LayoutVideoTelaCheia>
    <div slot="parte1">
        <!-- svelte-ignore a11y-media-has-caption -->
        <video autoplay bind:paused>            
            <source src="../assets/videos/intro.webm" type="video/webm" />
            Your browser does not support HTML5 video.
        </video>

        <div class="content">
            <h1>Vídeo de Introdução TRAO</h1>
            <p>
                Principais assuntos que serão abordados na disciplina.
            </p>
            <Button on:click={()=>{paused = !paused}}>
            {#if paused}
                Play
            {:else}
                Pausar
            {/if}</Button>
        </div>
    </div>
</LayoutVideoTelaCheia>

<Button
    class="proximo"
    size="lg"
    color="primary"
    on:click={() => ($storeCenas = visaoGeral)}
>
    Próximo
</Button>

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
/* 
    #myBtn {
        width: 200px;
        font-size: 18px;
        padding: 10px;
        border: none;
        background: #000;
        color: #fff;
        cursor: pointer;
    }

    #myBtn:hover {
        background: #ddd;
        color: black;
    } */
</style>
