<script>
  import { Col, Row } from "sveltestrap";
</script>

<div class="videoTelaCheia">
  <Col>
    <Row>
      <slot name="parte1" />
    </Row>
  </Col>
</div>

<style>
  .videoTelaCheia {
    position: absolute;
    top: 0;
    left: 0;
    width: 90vw;
    height: 80vh;
    background-color: rgb(255, 255, 255);
  }

</style>
