<template>
  <div>
    <n-page-header>
      <template #header>
        <n-grid :cols="2">
          <n-gi>
            <div>
              <n-button
                color="rgb(101, 198, 255)"
                class="glowAzul"
                @click="geralSet.selecionarSlide('cenas-template')"
                >CENAS</n-button
              >
            </div>
          </n-gi>
          <n-gi>
            <div>
              <n-button
                color="rgb(101, 198, 255)"
                class="glowAzul"
                @click="geralSet.selecionarSlide('exercicios-template')"
                >EXERCÍCIOS</n-button
              >
            </div>
          </n-gi>
        </n-grid>
      </template>
    </n-page-header>
  </div>
</template>

<script setup>
import storeGeral from "../store/storeGeral";

const { geralSet } = storeGeral;
</script>

<style scoped>
.n-button {
  font-size: 12rem;
  margin-top: 5rem;
  padding: 5rem;
  height: 40rem;
}
</style>
