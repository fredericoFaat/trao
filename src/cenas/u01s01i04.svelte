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

    import storeBabylon from "../store/storeBabylon";
    import storeCenas from "../store/storeCenas";

    import scene1 from "./u01s01i01.svelte";
    import scene3 from "./u01s01i03.svelte";

    import { Button } from "sveltestrap";
    import { gltf } from "./teste.svelte";

    var light;
    var scene;
    var camera;

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
        camera.useAutoRotationBehavior = true;
        camera.autoRotationBehavior.idleRotationSpeed = 1;

        light = new HemisphericLight("light", new Vector3(0, 1, -15), scene);
        light.intensity = 0.7;

        // Import the .env file as a CubeTexture
        const texture = new BABYLON.CubeTexture(
            "../assets/environment.env",
            scene
        );
        // Create a skybox mesh using this texture
        const skybox = scene.createDefaultSkybox(texture, true, 10000, 0.1);
        BABYLON.SceneLoader.ShowLoadingScreen = false;
        new BABYLON.SceneLoader.Append("", "data:" + gltf, scene, function () {
            scene.stopAllAnimations();
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
</script>

<!-- HTML FIXO -->
<div>
    <Button
        class="anterior"
        size="lg"
        color="danger"
        on:click={() => ($storeCenas = scene1)}
    >
        Anterior
    </Button>
    <Button
        class="proximo"
        size="lg"
        color="primary"
        on:click={() => ($storeCenas = scene3)}
    >
        Próximo
    </Button>
</div>

<!-- HTML -->
<div />

<!-- CSS -->
<style>
</style>
