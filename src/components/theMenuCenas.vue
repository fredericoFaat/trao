<template>
  <div>
    <n-grid :y-gap="10" :cols="10">
      <n-gi>
        <n-button
          color="rgb(101, 198, 255)"
          class="glowAzul"
          @click="cenaSet.selecionarCena('u01s01i01')"
        >
          1
        </n-button>
      </n-gi>
      <n-gi>
        <n-button
          color="rgb(101, 198, 255)"
          class="glowAzul"
          @click="cenaSet.selecionarCena('u02s01i01')"
        >
          2
        </n-button>
      </n-gi>
      <n-gi>
        <n-button
          color="rgb(101, 198, 255)"
          class="glowAzul"
          @click="cenaSet.selecionarCena('u03s01i01')"
        >
          3
        </n-button>
      </n-gi>
      <n-gi>
        <n-button
          color="rgb(101, 198, 255)"
          class="glowAzul"
          @click="cenaSet.selecionarCena('u04s01i01')"
        >
          4
        </n-button>
      </n-gi>
      <n-gi>
        <n-button
          color="rgb(101, 198, 255)"
          class="glowAzul"
          @click="cenaSet.selecionarCena('u05s01i01')"
        >
          5
        </n-button>
      </n-gi>
      <n-gi>
        <n-button
          color="rgb(101, 198, 255)"
          class="glowAzul"
          @click="cenaSet.selecionarCena('u06s01i01')"
        >
          6
        </n-button>
      </n-gi>
      <n-gi>
        <n-button
          color="rgb(101, 198, 255)"
          class="glowAzul"
          @click="cenaSet.selecionarCena('u07s01i01')"
        >
          7
        </n-button>
      </n-gi>
      <n-gi>
        <n-button
          color="rgb(101, 198, 255)"
          class="glowAzul"
          @click="cenaSet.selecionarCena('u08s01i01')"
        >
          8
        </n-button>
      </n-gi>
      <n-gi>
        <n-button
          color="rgb(101, 198, 255)"
          class="glowAzul"
          @click="cenaSet.selecionarCena('u09s01i01')"
        >
          9
        </n-button>
      </n-gi>
      <n-gi>
        <n-button
          color="rgb(101, 198, 255)"
          class="glowAzul"
          @click="cenaSet.selecionarCena('u10s01i01')"
        >
          10
        </n-button>
      </n-gi>
    </n-grid>
  </div>
</template>


<script setup>
import storeCenas from "../store/storeCenas";

const { cenaSet } = storeCenas;
</script>