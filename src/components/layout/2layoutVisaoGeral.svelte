<script>
  import { Col, Container, Row } from "sveltestrap";
</script>

<div class="visaoGeral">
  <h1>VISÃO GERAL</h1>
  <Container>
    <Row>
      <Col>
        <h2>OBJETIVO</h2>
        <div class="objetivo">
          <h3><slot name="objetivo" /></h3>
          <div class="vl" />
        </div>
      </Col>
      <Col>
        <h2>ROTEIRO</h2>
        <div class="roteiro">
          <slot name="roteiro" />
        </div>
      </Col>
    </Row>
  </Container>
</div>
