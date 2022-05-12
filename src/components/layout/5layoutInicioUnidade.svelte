<script>
  import { Col, Container, Row } from "sveltestrap";
</script>

<Container class="unidade">
  <Row>
    <Col class="azulBrancoEsquerda">
      <Row class="azulBrancoContainer">
        <Col class="azulBrancoImgEsquerda1">
          <img
            width="200"
            height="300"
            src="./assets/imagens/LogoEEAR.svg"
            alt="img1"
          />
        </Col>
        <Col class="azulBrancoImgEsquerda2">
          <img
            width="350"
            height="250"
            src="./assets/imagens/gladioAlado.png"
            alt="img2"
          />
          <h2>FORÇA AÉREA BRASILEIRA</h2>
        </Col>
      </Row>
    </Col>
    <Col class="azulBrancoDireita">
        <Row>
          <h1><slot name="assuntos" /></h1>
        </Row>
        <Row>
          <h1><slot name="unidade" /></h1>
        </Row>
    </Col>
  </Row>
</Container>
