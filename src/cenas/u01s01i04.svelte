<script>
	import { Button } from "sveltestrap";

	import storeCenas from "../store/storeCenas";

	import scene3 from "./u01s01i03.svelte";
	import scene5 from "./u01s01i05.svelte";

	import Layout1 from "../components/layout/7layout1.svelte";

</script>

<!-- HTML FIXO -->
<div>
	<Button
		class="anterior"
		size="lg"
		color="danger"
		on:click={() => ($storeCenas = scene3)}
	>
		Anterior
	</Button>
	<Button
		class="proximo"
		size="lg"
		color="primary"
		on:click={() => ($storeCenas = scene5)}
	>
		Próximo
	</Button>
</div>

<!-- HTML -->
<div>
	<Layout1>
		<div slot="parte1">
			<h1>Titulo 1</h1>
			<p>textoo 11</p>
		</div>
		<div slot="parte2">
			<h1>Titulo 2</h1>
			<p>texto 222</p>
		</div>
	</Layout1>
</div>

<!-- CSS -->
<style>
</style>
