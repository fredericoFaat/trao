<script>
    import { onMount } from "svelte";
    import {
        Scene,
        ArcRotateCamera,
        Color4,
        Color3,
        Vector3,
        HemisphericLight,
        ActionManager,
        ExecuteCodeAction,
        GlowLayer,
        HighlightLayer,
    } from "babylonjs";
    import * as BABYLON from "babylonjs";
    import "babylonjs-loaders";

    import storeBabylon from "../store/storeBabylon";
    import storeCenas from "../store/storeCenas";

    
    import scene1 from "./u01s01i01.svelte";
    import scene3 from "./u01s01i03.svelte";

    import { Button } from "sveltestrap";
	import { gltf } from './teste.svelte';

    let btnAzul;
    let btnAmarelo;
    let led;
    let btnAmareloClicado;
    let btnAzulClicado;
    var glowLayer;
    var highLightLayer;
    var light;
    var scene;
    var camera;
    let tag1 = false;
    let tag2 = false;
    let users = [];
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
        glowLayer = new GlowLayer("glow", scene);
        highLightLayer = new HighlightLayer("highlight", scene);
// Import the .env file as a CubeTexture
const texture = new BABYLON.CubeTexture('../assets/environment.env', scene);
// Create a skybox mesh using this texture
const skybox = scene.createDefaultSkybox(texture, true, 10000, 0.1);
        BABYLON.SceneLoader.ShowLoadingScreen = false;

        new BABYLON.SceneLoader.Append("", "data:" + gltf, scene, function () {
            scene.stopAllAnimations();
            btnAzul = scene.meshes[2];
            btnAmarelo = scene.meshes[4];
            led = scene.meshes[6];

            btnAmareloClicado = false;
            btnAzulClicado = false;
            btnAzul.visibility = 0.3;
            btnAmarelo.visibility = 0.2;
            led.visibility = 0.2;
            led.checkCollisions = true;
            btnAzul.checkCollisions = true;
            let opt = {
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0),
            };
            let drag = new BABYLON.PointerDragBehavior(opt);
            drag.enabled = true;
            led.addBehavior(drag);

            scene.onKeyboardObservable.add((keyInfo) => {
                switch (keyInfo.type) {
                    case BABYLON.KeyboardEventTypes.KEYDOWN:
                        switch (keyInfo.event.key) {
                            case "a":
                            case "A":
                                led.moveWithCollisions(
                                    new BABYLON.Vector3(-0.1, 0, 0)
                                );
                                break;
                            case "d":
                            case "D":
                                led.moveWithCollisions(
                                    new BABYLON.Vector3(0.1, 0, 0)
                                );
                                break;
                            case "w":
                            case "W":
                                led.moveWithCollisions(
                                    new BABYLON.Vector3(0, 0, 0.1)
                                );
                                break;
                            case "s":
                            case "S":
                                led.moveWithCollisions(
                                    new BABYLON.Vector3(0, 0, -0.1)
                                );
                                break;
                            case "q":
                            case "Q":
                                led.moveWithCollisions(
                                    new BABYLON.Vector3(0, 0.1, 0)
                                );
                                break;
                            case "e":
                            case "E":
                                led.moveWithCollisions(
                                    new BABYLON.Vector3(0, -0.1, 0)
                                );
                                break;
                        }
                        break;
                }
            });
            led.onCollideObservable.add(function (m, evt) {
                let msg = "Collision with: " + m.name;
                console.log(msg);
                highLightLayer.addMesh(btnAmarelo, Color3.Green());
            });
            btnAmarelo.actionManager = new ActionManager(scene);
            btnAmarelo.actionManager.registerAction(
                new ExecuteCodeAction(
                    ActionManager.OnPickDownTrigger,
                    function () {
                        tag1 = true;
                        tag2 = false;
                        highLightLayer.addMesh(btnAmarelo, Color3.Green());
                        btnAmareloClicado = true;
                        scene.getAnimationGroupByName("clickBtn2").play();
                        if (btnAmareloClicado && btnAzulClicado) {
                            led.material.emissiveColor = Color3.Red();
                        }
                    }
                )
            );
            btnAzul.actionManager = new ActionManager(scene);
            btnAzul.actionManager.registerAction(
                new ExecuteCodeAction(
                    ActionManager.OnPickDownTrigger,
                    function () {
                        tag1 = false;
                        tag2 = true;
                        highLightLayer.addMesh(btnAzul, Color3.Green());
                        scene.getAnimationGroupByName("clickBtn1").play();
                        btnAzulClicado = true;
                        if (btnAmareloClicado && btnAzulClicado) {
                            led.material.emissiveColor = Color3.Red();
                        }
                    }
                )
            );
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

    function teste1() {
        tag1 = true;
        tag2 = false;
        highLightLayer.addMesh(btnAmarelo, Color3.Green());
        btnAmareloClicado = true;
        scene.getAnimationGroupByName("clickBtn2").play();
        if (btnAmareloClicado && btnAzulClicado) {
            led.material.emissiveColor = Color3.Red();
        }
    }
    function teste2() {
        tag1 = false;
        tag2 = true;
        highLightLayer.addMesh(btnAzul, Color3.Green());
        scene.getAnimationGroupByName("clickBtn1").play();
        btnAzulClicado = true;
        if (btnAmareloClicado && btnAzulClicado) {
            led.material.emissiveColor = Color3.Red();
        }      
    }
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
<div>
    {#if tag1}
        <div class="tag" id="tag1">TEste1</div>
    {/if}
    {#if tag2}
        <div class="tag" id="tag2">TEste2</div>
    {/if}

    <div style="margin:0.5rem;">
        <Button size="lg" color="warning" on:click={() => camera.useAutoRotationBehavior = !camera.useAutoRotationBehavior }>anim1</Button>
        <Button size="lg" color="warning" on:click={teste2}>anim2</Button>
    </div>
</div>

<!-- CSS -->
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
