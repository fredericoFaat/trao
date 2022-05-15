<script>
  	import { Button } from 'sveltestrap';
    import LayoutVisaoGeral from "../../components/layout/2layoutVisaoGeral.svelte";
    import storeCenas from "../../store/storeCenas";
    import videoIntroducao from './2videoIntroducao.svelte'
    import storeGeral from "../../store/storeGeral";
    import u01Inicio from "../u01Inicio.svelte"
    import u02Inicio from "../u02Inicio.svelte"
    import u03Inicio from "../u03Inicio.svelte"
        import { Col, Container, Row } from "sveltestrap";

</script>
<!--HTML FIXO-->
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


  <!-- HTML -->
  <div class="visaoGeral">
    <h1>VISÃO GERAL</h1>
    <div class="objetivo">
      <h2>OBJETIVO</h2>
      <h3>{$storeGeral.objetivo}</h3>
    </div>
    <Container xl>
      <Row>
        <Col xs="6">
          <div class="unidades">
            <h2>UNIDADES</h2>
            <slot name="unidades" />
          </div>
        </Col>
        <Col xs="6">
          <div class="exercicios">
            <h2>EXERCÍCIOS</h2>
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
        </Col>
      </Row>
    </Container>
  </div>
  
  <style>
    .visaoGeral {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      background-image: url("../assets/imagens/nuvemFundo.png");
      background-size: cover;
      height: 90vh;
    }
    .visaoGeral h1 {
      color: white;
      font-size: 7.2rem;
      font-weight: bold;
      margin-left: 2rem;
    }
    .visaoGeral .objetivo {
      position: absolute;
      top: 0vh;
      left: 35vw;
      width: 60vw;
    }
  
    .visaoGeral .objetivo h2 {
      color: orange;
      font-size: 5.2rem;
      font-weight: bold;
    }
    .visaoGeral .objetivo h3 {
      color: white;
      font-size: 3.2rem;
      font-weight: bold;
      text-align: justify;
    }
  
    .visaoGeral .unidades {
      position: absolute;
      top: 15vh;
      left: 1vw;
      width: 45vw;
    }
    .visaoGeral .unidades h2{
      color: orange;
      font-size: 5.2rem;
      font-weight: bold;
    }
    .visaoGeral .unidades .ol {
      color: white;
      font-size: 3.6rem;
      text-indent: 1rem;
      line-height: 5vh;
      list-style-type: none;
      text-align: left;
    }
    .visaoGeral .unidades .li {
      padding-top: 3rem;
    }
    .visaoGeral .unidades .unidadesItem {
      font-size: 3rem;
    }
  </style>
  