<script>
  import { Col, Row } from "sveltestrap";
</script>

<div class="slide">
  <Col>
    <Row>
      <slot name="parte1" />
    </Row>
    <Row>
      <slot name="parte2" />
    </Row>
  </Col>
</div>

<style>
  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 90vh;
    padding: 5rem;
    font-size: 5rem;
    background-color: rgb(255, 255, 255);
  }

  .slide :global(h1) {
    font-size: 6rem;
    text-align: center;
    color: rgb(255, 136, 0);
  }
</style>
