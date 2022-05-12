<script>
  import { Col, Container, Row } from "sveltestrap";
</script>

<Container class="visaoGeral">
  <Row>
    <Col>
      <h2>ROTEIRO CONCLUÍDO</h2>
      <div class="objetivo">
        <h3><slot name="objetivo" /></h3>
        <div class="vl" />
      </div>
      <div>
        <h2>Não esqueça de realizar os exercícicos</h2>
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
