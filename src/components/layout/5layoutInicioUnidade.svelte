<script>
</script>

<div>
  <div class="azulBrancoEsquerda">
    <div class="azulBrancoContainer">
      <div class="domEEAR">
        <img
          width="200"
          height="300"
          src="./assets/imagens/LogoEEAR.svg"
          alt="img1"
        />
      </div>
      <div class="gladioAlado">
        <img
          width="350"
          height="250"
          src="./assets/imagens/gladioAlado.png"
          alt="img2"
        />
        <h2>FORÇA AÉREA BRASILEIRA</h2>
      </div>
    </div>
  </div>
  <div class="azulBrancoDireita">
    <div>
      <h1><slot name="assuntos" /></h1>
    </div>
  </div>
</div>

<style>
  .azulBrancoContainer {
    position: absolute;
    top: 0;
    left: 0;
    height: 89vh;
    justify-content: center;
    align-items: center;
  }

  .azulBrancoEsquerda {
    position: absolute;
    margin: 0;
    top: 0;
    left: 0;
    width: 100vw;
    height: 90vh;
    background-image: url("../assets/imagens/nuvemFundo.png");
    background-size: cover;
  }

  .domEEAR {
    position: absolute;
    top: 30vh;
    left: 8vw;
    color: white;
    text-align: center;
  }

  .gladioAlado {
    position: absolute;
    top: 30vh;
    left: 25vw;
    color: white;
    text-align: center;
  }

  .azulBrancoDireita {
    position: absolute;
    background-color: white;
    top: 0;
    left: 50vw;
    width: 50vw;
    height: 90vh;
  }

  .azulBrancoDireita h1 {
    position: relative;
    top: 40vh;
    margin: 0;
    padding: 0;
    text-align: center;
    color: #102d69;
    font-size: 8rem;
  }
</style>
