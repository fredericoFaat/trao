<template>
  <div>
    <n-button
      color="rgb(158, 158, 158)"
      class="anterior glowCinza"
      @click="cenaSet.selecionarCena('u01s01i07')"
      >Anterior</n-button
    >
    <n-button
      color="rgb(101, 198, 255)"
      class="proximo glowAzul"
      @click="cenaSet.selecionarCena('u02-inicio')"
      >Próximo</n-button
    >
  </div>
  <layout-visao-geral>
    <template v-slot:objetivo
      >{{ geralState.roteiros[1]["unidade"] }}
    </template>
    <template v-slot:roteiro>
      <ol>
        <li v-for="(roteiro, unidade) in geralState.roteiros" :key="unidade">
          {{ roteiro.unidade }}
        </li>
      </ol>
    </template>
  </layout-visao-geral>
</template>

<script setup>

import layoutVisaoGeral from "../../layout/4layoutFinalUnidade.vue";

import storeCenas from "../../store/storeCenas";
import storeGeral from "../../store/storeGeral";

import {
  Scene,
  ArcRotateCamera,
  Color4,
  Vector3,
  HemisphericLight,
} from "babylonjs";

import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

    const { cenaState, cenaSet } = storeCenas;
    const { geralState } = storeGeral;

    function createScene(canvas, engine) {
      var scene = new Scene(engine);
      var camera = new ArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI / 2,
        0,
        new Vector3(0, 2, 0),
        scene
      );
      camera.upperRadiusLimit = 30;
      camera.lowerRadiusLimit = 30;
      camera.attachControl(canvas, true);
      new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
      scene.clearColor = new Color4(1, 1, 1, 1);

      var gltf = `{
    "asset" : {
        "generator" : "Khronos glTF Blender I/O v1.7.33",
        "version" : "2.0"
    },
    "scene" : 0,
    "scenes" : [
        {
            "name" : "Scene"
        }
    ]
}
`;

      new BABYLON.SceneLoader.Append("", "data:" + gltf, scene, function () {});

      engine.runRenderLoop(function () {
        scene.render();
      });

      return scene;
    }
    createScene(cenaState.canvas, cenaState.engine);

    cenaSet.cabecalhoEsquerda(geralState.disciplina);
    cenaSet.cabecalhoDireita(geralState.roteiros[1]["unidade"]);

</script>