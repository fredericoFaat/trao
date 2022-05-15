<script>
  import { Col, Container, Row } from "sveltestrap";
</script>

<div class="visaoGeral">
  <h1>VISÃO GERAL</h1>
  <Container xl>
    <Row>
      <Col xs="6">        
        <div class="objetivo">
          <h2>OBJETIVO</h2>
          <h3><slot name="objetivo" /></h3>          
        </div>        
      </Col>
      <!-- <div class="vl" /> -->
      <Col xs="6">        
        <div class="roteiro">
          <h2>ROTEIRO</h2>
          <slot name="roteiro" />
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
    margin: 0;
    padding: 0;
    height: 90vh;
  }
  /* .visaoGeral .vl {
    position: absolute;
    top: -4rem;
    left: - 10vw;
    height: 65rem;
    border-right: 0.1rem solid rgb(167, 167, 167);
  } */
  .visaoGeral h1 {
    position: relative;
    padding-left: 10rem;
    padding-top: 2rem;
    margin: 0;
    color: white;
    font-size: 7.2rem;
    font-weight: bold;
  }
  .visaoGeral h2 {
    position: relative;
    margin: 0;
    text-align: center;
    color: orange;
    font-size: 5.2rem;
    padding-top: 5rem;
    font-weight: bold;
  }
  .visaoGeral h3 {
    position: relative;
    margin: 0;
    text-align: center;
    color: white;
    font-size: 5.2rem;
    padding-top: 1rem;
    font-weight: bold;
  }
  .visaoGeral .objetivo {
    position: absolute;
    top: 10vh;
    left: 2vw;
    width: 45vw;
    padding: 1rem;
    color: white;
    font-size: 3.6rem;
    font-weight: lighter;
    text-align: justify;
  }
  .visaoGeral .roteiro {
    position: absolute;
    top: 10vh;
    text-align: left;
    width: 45vw;
    padding: 1rem;
    color: white;    
    font-size: 3.6rem;
    text-indent: 1rem;
    line-height: 5vh;
  }
  .visaoGeral .roteiro :global(ol) {    
    list-style-type: none;
    text-align: left;
  }
</style>
