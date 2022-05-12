<script>
    import { onMount } from "svelte";
    import {
        Scene,
        ArcRotateCamera,
        Color4,
        Vector3,
        HemisphericLight,
    } from "babylonjs";
    import * as BABYLON from "babylonjs";
    import "babylonjs-loaders";

    import storeBabylon from "../../../store/storeBabylon";
    import storeCenas from "../../../store/storeCenas";

    import u01Inicio from "../u01Inicio.svelte";
    import scene2 from "../../../cenas/u01/s01/Scene2.svelte";
    import { Button } from "sveltestrap";

    var light;
    var scene;
    var camera;
    let tag1 = false;
    let tag2 = false;

    const createScene = (canvas, engine) => {
        scene = new Scene(engine);
        scene.clearColor = new Color4(1, 1, 1, 1);
        camera = new ArcRotateCamera(
            "Camera",
            Math.PI / 2,
            Math.PI / 2,
            2,
            new Vector3(0, 0, -20),
            scene
        );
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);

        light = new HemisphericLight("light", new Vector3(0, 1, -15), scene);
        light.intensity = 0.7;

        var gltf =
    `{
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

        BABYLON.SceneLoader.ShowLoadingScreen = false;

        new BABYLON.SceneLoader.Append("", "data:" + gltf, scene, function () {
            scene.stopAllAnimations();
            btnAzul = scene.meshes[2];
            btnAmarelo = scene.meshes[4];
            led = scene.meshes[5];
        });

        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", () => {
            engine.resize();
        });

        return scene;
    };
    onMount(() => {
        createScene($storeBabylon.canvas, $storeBabylon.engine);
    });

    function passo1() {}

    function passo2() {}
</script>

{#if tag1}
    <div class="tag" id="tag1">TEste1</div>
{/if}
{#if tag2}
    <div class="tag" id="tag2">TEste2</div>
{/if}

<div style="margin:0.5rem;">
    <Button size="lg" color="warning" on:click={passo1}>anim1</Button>
    <Button size="lg" color="warning" on:click={passo2}>anim2</Button>
</div>

<Button
    class="anterior"
    size="lg"
    color="danger"
    on:click={() => ($storeCenas = u01Inicio)}
>
    Anterior
</Button>
<Button
    class="proximo"
    size="lg"
    color="primary"
    on:click={() => ($storeCenas = scene2)}
>
    Próximo
</Button>

<style>
    .tag {
        font-size: 1.6rem;
        width: auto;
        padding: 1rem;
        background-color: cornsilk;
        position: absolute;
        border-radius: 30%;
    }
    #tag1 {
        top: 10vh;
        left: 50vw;
    }
    #tag2 {
        top: 10vh;
        left: 10vw;
    }
</style>
