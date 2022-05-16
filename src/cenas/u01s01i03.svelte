<script>
    //ANTERIOR
       import u01s01i02 from "./u01s01i02.svelte";
   //PRÓXIMO
       import u01s01i04 from "./u01s01i04.svelte";
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
        on:click={() => ($storeCenas = u01s01i02)}
    >
        Anterior
    </Button>
    <Button
        class="proximo"
        size="lg"
        color="primary"
        on:click={() => ($storeCenas = u01s01i04)}
    >
        Próximo
    </Button>
</div>

<!-- HTML CRITÉRIOS GERAIS-->
<LayoutSlideA>
    <div slot="parte1">
        <h2>CRITÉRIOS GERAIS</h2>
        <p>
            A característica de um voo visual se dá quando uma aeronave mantém
            continuamente, da decolagem ao pouso, separação adequada de nuvens
            ou outras formações de densidade equivalente, permitindo assim ao
            piloto em comando, por intermédio do uso da visão, uma avaliação de
            distâncias verticais seguras em relação aos obstáculos no solo ou
            água, e distâncias horizontais que permitam manobrar a aeronave em
            tempo suficiente, a fim de evitar colisões com outras aeronaves em
            voo.
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
