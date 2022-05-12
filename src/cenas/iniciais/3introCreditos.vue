<template>
  <div>
    <n-button
      color="rgb(158, 158, 158)"
      class="anterior glowCinza"
      @click="geralSet.selecionarSlide('visao-geral')"
      >Anterior</n-button
    >
    <n-button
      color="rgb(101, 198, 255)"
      class="proximo glowAzul"
      @click="geralSet.selecionarSlide('cenas-template')"
      >Próximo</n-button
    >
  </div>
  <layout-intro-creditos>
    <template v-slot:introCreditos>
      <div>
        <h1>CRÉDITOS</h1>
        <ul>
          <li>1T QOAP PED FREDERICO</li>
          <li>1S QSS BET LUCAS</li>
        </ul>
        <h1>CONTATOS</h1>
      </div>
    </template>
  </layout-intro-creditos>
</template>

<script setup>
import storeGeral from "../../store/storeGeral";
import storeCenas from "../../store/storeCenas";

import layoutIntroCreditos from "../../layout/3layoutIntroCreditos.vue";

const { cenaSet } = storeCenas;
const { geralSet } = storeGeral;

cenaSet.cabecalhoEsquerda("");
cenaSet.cabecalhoDireita("");
</script>
