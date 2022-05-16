<script>
    //ANTERIOR
    import u01s01i05 from "./u01s01i05.svelte";
    //PRÓXIMO
    import u01s01i07 from "./u01s01i07.svelte";
    //SVELTE
    import storeCenas from "../store/storeCenas";
    import storeBabylon from "../store/storeBabylon";
    import { onMount } from "svelte";
    //LAYOUT

    //SVELTESTRAP
    import { Button } from "sveltestrap";
    //BABYLONJS
    import {
        Scene,
        ArcRotateCamera,
        Color4,
        Vector3,
        HemisphericLight,
    } from "babylonjs";
    import * as BABYLON from "babylonjs";
    import "babylonjs-loaders";

    import { gltf } from "./cena2.svelte";

    //SCRIPTS

    var light;
    var scene;
    var camera;
    let passo = 1;
    let ani01;
    let ani02;
    let ani03;
    let ani04;
    let ani05;
    
    const createScene = (canvas, engine) => {
        scene = new Scene(engine);
        scene.clearColor = new Color4(0.08, 0.1, 0.07, 1);
        camera = new ArcRotateCamera(
            "Camera",
            Math.PI / 2,
            Math.PI / 2,
            20,
            new Vector3(0, 0, 0),
            scene
        );
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);

        camera.lowerAlphaLimit = Math.PI/2;
        camera.upperAlphaLimit = Math.PI/2;
        camera.lowerBetaLimit = Math.PI/2;
        camera.upperBetaLimit = Math.PI/2;
        camera.lowerRadiusLimit = 20;
        camera.upperRadiusLimit = 20;


        light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 1;


        BABYLON.SceneLoader.ShowLoadingScreen = false;
        new BABYLON.SceneLoader.Append("", "data:" + gltf, scene, function () {
            scene.stopAllAnimations();
            ani01 = scene.getAnimationGroupByName("ani01");
            ani02 = scene.getAnimationGroupByName("ani02");
            ani03 = scene.getAnimationGroupByName("ani03");
            ani04 = scene.getAnimationGroupByName("ani04");
            ani05 = scene.getAnimationGroupByName("ani05");
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

    function passos() {
        if (passo == 1) {
            ani01.play();
            passo = 2;
        }
        else if (passo == 2) {
            ani02.play();
            passo = 3;
        }
        else if (passo == 3) {
            ani03.play();
            passo = 4;
        }
        else if (passo == 4) {
            ani04.play();
            passo = 5;
        }
        else {
            ani05.play();
            passo = 1;
        };
    }




</script>

<!-- HTML FIXO -->
<div>
    <Button
        class="anterior"
        size="lg"
        color="danger"
        on:click={() => ($storeCenas = u01s01i05)}
    >
        Anterior
    </Button>
    <Button
        class="proximo"
        size="lg"
        color="primary"
        on:click={() => ($storeCenas = u01s01i07)}
    >
        Próximo
    </Button>
</div>

<!-- HTML(BLENDER) ESPAÇO AÉREO C D E -->
<Button        
        size="lg"
        color="primary"
        on:click={passos}
    >
        PASSOS
    </Button>
<!-- CSS -->
<style>
</style>
