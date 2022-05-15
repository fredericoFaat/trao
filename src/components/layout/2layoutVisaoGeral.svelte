<script>
  import { Col, Container, Row } from "sveltestrap";
</script>

<div class="visaoGeral">
  <h1>VISÃO GERAL</h1>
  <div class="objetivo">
    <h2>OBJETIVO</h2>
    <h3><slot name="objetivo" /></h3>
  </div>
  <Container xl>
    <Row>
      <Col xs="6">
        <div class="unidades">
          <h2>UNIDADES</h2>
          <slot name="unidades" />
        </div>
      </Col>
      <!-- <div class="vl" /> -->
      <Col xs="6">
        <div class="exercicios">
          <h2>EXERCÍCIOS</h2>
          <slot name="exercicios" />
        </div>
      </Col>
    </Row>
  </Container>
</div>

<style>
  /*VISÃO GERAL------------------------------------------------------------------------------------------------------------------------*/
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
  .visaoGeral .unidades :global(ol) {
    color: white;
    font-size: 3.6rem;
    text-indent: 1rem;
    line-height: 5vh;
    list-style-type: none;
    text-align: left;
  }
  .visaoGeral .unidades :global(li) {
    padding-top: 3rem;
  }
  .visaoGeral .unidades :global(.unidadesItem) {
    font-size: 3rem;
  }
</style>
