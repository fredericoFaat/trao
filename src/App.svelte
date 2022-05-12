<script>
	import { onMount } from "svelte";
	import babylonStore from "./store/storeBabylon";
	import storeCenas from "./store/storeCenas";
	import * as BABYLON from "babylonjs";
	import LayoutVidro from "./components/layout/layoutVidro.svelte";
	// import { fade, fly, slide, scale } from "svelte/transition";
	import inicioGeral from "./cenas/iniciais/1InicioGeral.svelte";
	import { Button } from 'sveltestrap';

	let canvas;

	onMount(() => {
		const createScene = (canvas) => {
			const engine = new BABYLON.Engine(canvas, true);
			$babylonStore.engine = engine;
			$babylonStore.canvas = canvas;
		};
		createScene(canvas);
	});
</script>

<Button
	on:click={() => ($storeCenas = inicioGeral)}
	class="menuInicio"
	size="lg"
	color="primary"
	>INÍCIO</Button
>
<LayoutVidro>
	<div slot="meio">
		<canvas bind:this={canvas} />
		<svelte:component this={$storeCenas} />
	</div>
</LayoutVidro>

<style>
	* :global(:root) {
		font-size: 50%;
	}
</style>
