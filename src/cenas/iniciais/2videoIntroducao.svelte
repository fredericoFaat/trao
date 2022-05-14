<script>
    import storeCenas from "../../store/storeCenas";
    import visaoGeral from './3visaoGeral.svelte'
    import LayoutVideoTelaCheia from "../../components/layout/8layoutVideoTelaCheia.svelte";
	import { Button } from 'sveltestrap';

</script>


<LayoutVideoTelaCheia>
    <div slot="parte1">
        <!-- svelte-ignore a11y-media-has-caption -->
        <video width="320" height="240" controls>
            <source src="../assets/videos/intro.webm" type="video/mp4">            
        </video>
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