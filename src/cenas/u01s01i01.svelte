<script>
 //ANTERIOR
    import u01Inicio from "./u01Inicio.svelte";
//PRÓXIMO
    import u01s01i02 from "./u01s01i02.svelte";
//STORE
    import storeCenas from "../store/storeCenas";
//LAYOUT
    import LayoutSlideA from "../components/layout/7layout1R1C.svelte";
//SVELTESTRAP
    import { Button } from "sveltestrap";
</script>

<!-- HTML FIXO -->
<div>
    <Button
        class="anterior"
        size="lg"
        color="danger"
        on:click={() => ($storeCenas = u01Inicio)}
    >
        Anterior
    </Button>
    <Button
        class="proximo"
        size="lg"
        color="primary"
        on:click={() => ($storeCenas = u01s01i02)}
    >
        Próximo
    </Button>
</div>

<!-- HTML RESPONSABILIDADES-->
<LayoutSlideA>
    <div slot="parte1">
        <p>
            A responsabilidade pelo cumprimento das Regras do Ar é atribuída
            tanto ao controlador de tráfego aéreo quanto ao piloto em comando,
            quer ele esteja ou não manobrando a aeronave, podendo delas se
            desviar quando absolutamente necessário ao atendimento de exigências
            de segurança. Com a finalidade de poder cumprir as Regras do Ar é
            exigido do piloto em comando conhecimento de todas as informações
            relativas à operação pretendida. Toda aeronave estará submetida às
            regras gerais e ainda às regras específicas ao voo que se realiza:
        </p>
        <ul>
            <li>REGRAS DE VOO VISUAL</li>
            <li>REGRAS DE VOO POR INSTRUMENTOS</li>
        </ul>
    </div>
</LayoutSlideA>

<!-- CSS -->
<style>
</style>
