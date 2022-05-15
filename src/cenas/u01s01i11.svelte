<script>
    //ANTERIOR
       import u01s01i03 from "./u01s01i03.svelte";
   //PRÓXIMO
       import u01s01i05 from "./u01s01i05.svelte";
   //STORE
       import storeCenas from "../store/storeCenas";
   //LAYOUT
       import LayoutSlideA from "../components/layout/7layout1R1C.svelte";
   //SVELTESTRP
       import { Button } from "sveltestrap";
   </script>

<!-- HTML FIXO -->
<div>
    <Button
        class="anterior"
        size="lg"
        color="danger"
        on:click={() => ($storeCenas = u01s01i03)}
    >
        Anterior
    </Button>
    <Button
        class="proximo"
        size="lg"
        color="primary"
        on:click={() => ($storeCenas = u01s01i05)}
    >
        Próximo
    </Button>
</div>

<!-- HTML MÍNIMOS METEOROLÓGICOS DE AERÓDROMOS -->
<LayoutSlideA>
    <div slot="parte1">
        <h1>MÍNIMOS METEOROLÓGICOS DE AERÓDROMO</h1>
        <p>
            Todo voo inicia e termina num aeródromo e é a partir dele que uma
            aeronave manterá as regras VFR. Para isso estabeleceu-se condições
            de distâncias verticais e horizontais mínimas para atender ao voo
            VFR. Abaixo destes mínimos, será proibido utilização do aeródromo
            para pouso, decolagem ou mesmo aproximação. Os aeródromos terão suas
            operações suspensas do voo VFR quando:
        </p>
        <ul>
            <li>- O teto for inferior a 1500 pés (450m); ou</li>
            <li>- A visibilidade no solo for inferior a 5Km.</li>
        </ul>
    </div>
</LayoutSlideA>

<!-- CSS -->
<style>
</style>
