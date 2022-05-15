<script>
  import { Col, Row } from "sveltestrap";
</script>

<div class="slide">
  <Row>
    <Col>
      <slot name="parte1" />
    </Col>
  </Row>
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
    font-size: 4rem;
    text-align: center;
    margin-bottom: 2rem;
    color: rgb(255, 136, 0);
  }

  .slide :global(h2) {
    font-size: 3rem;
    text-align: left;
    margin-bottom: 2rem;
    color: rgb(18, 47, 212);
  }

  .slide :global(p) {
    font-size: 2.6rem;
    text-align: justify;
    color: rgb(0, 0, 0);
  }

  .slide :global(ul) {
    font-size: 2.6rem;
    text-align: left;
    margin-left: 2rem;
    color: rgb(0, 0, 0);
    list-style-type: none;
  }
</style>
