<script>
  import { Button } from "sveltestrap";
  import { Col } from "sveltestrap";
  import { Row } from "sveltestrap";

  export let questoes;

  let respostas = new Array(questoes.length).fill(null);
  let questaoApontada = -1;
  function obterResultado() {
    let resultado = respostas.reduce((acc, val, index) => {
      if (questoes[index].indexCorreto == val) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return (resultado / questoes.length) * 100 + "%";
  }
  function reiniciarQuestionario() {
    respostas = new Array(questoes.length).fill(null);
    questaoApontada = 0;
  }
</script>

<div class="questinario">
  {#if questaoApontada == -1}
    <div class="tela-inicio">
      <Button
        size="lg"
        color="primary"
        on:click={() => {
          questaoApontada = 0;
        }}
      >
        Iniciar o questionário
      </Button>
    </div>
  {:else if !(questaoApontada > respostas.length - 1)}
    <div class="tela-perguntas">
      <Col>
        <Row>
          <div class="pergunta">
            <h2>
              {questoes[questaoApontada].questao}
            </h2>
          </div>
        </Row>
        <Row>
          <div class="opcoes">
            {#each questoes[questaoApontada].opcoes as opc, i}
              <button
                class={respostas[questaoApontada] == i &&
                respostas[questaoApontada] !==
                  questoes[questaoApontada].indexCorreto
                  ? "errada"
                  : respostas[questaoApontada] == i &&
                    respostas[questaoApontada] ==
                      questoes[questaoApontada].indexCorreto
                  ? "correta"
                  : ""}
                on:click={() => {
                  respostas[questaoApontada] = i;
                }}
              >
                {opc}
              </button>
            {/each}
          </div>
        </Row>
      </Col>
      <div class="rodape">
        <div class="barra-progresso">
          <div style="width:{(questaoApontada / questoes.length) * 100}%" />
        </div>
        <div class="botoes">
          <Button
            color="danger"
            disabled={questaoApontada == 0}
            on:click={() => {
              questaoApontada--;
            }}
          >
            &lt;
          </Button>
          <Button
            color="primary"
            on:click={() => {
              questaoApontada++;
            }}
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  {:else}
    <div class="tela-resultado">
      <h1>
        Seu resultado: {obterResultado()}
      </h1>
      <Button on:click={reiniciarQuestionario}>Reiniciar o questionário</Button>
    </div>
  {/if}
</div>

<style>
  .questinario {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 90vh;
    background-color: white;
    z-index: 1;
  }
  .tela-inicio {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .tela-perguntas {
    width: 100vw;
    height: 90vh;
    padding: 5rem;
  }
  .pergunta {
    font-size: 2rem;
  }
  .opcoes button {
    width: 100%;
    font-size: 2rem;
    padding: 0.5rem;

    border-radius: 2rem;
    margin: 1rem 0rem;
  }

  button.errada {
    background: rgb(219, 10, 10);
    color: rgb(255, 255, 255);
  }

  button.correta {
    background: rgb(36, 114, 0);
    color: rgb(255, 255, 255);
  }
  .rodape {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #eee;
  }
  .rodape > div {
    margin: 0rem 1rem;
  }
  .barra-progresso {
    width: 15rem;
    height: 1rem;
    background: #aaa;
    border-radius: 1rem;
    overflow: hidden;
  }
  .barra-progresso div {
    height: 100%;
    background: #4a77dc;
  }

  .tela-resultado {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .tela-resultado h1 {
    margin-bottom: 1rem;
  }
</style>
