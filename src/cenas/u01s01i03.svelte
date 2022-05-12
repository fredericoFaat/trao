<script>
	import { Button } from "sveltestrap";

	import storeCenas from "../store/storeCenas";

	import scene2 from "./u01s01i02.svelte";
	import scene4 from "./u01s01i04.svelte";

	import storeExercicios from "../store/storeExercicios";
	import LayoutQuiz from "../components/layout/6layoutQuiz.svelte";

	let questoes = $storeExercicios;
</script>

<!-- HTML FIXO -->
<div>
	<Button
		class="anterior"
		size="lg"
		color="danger"
		on:click={() => ($storeCenas = scene2)}
	>
		Anterior
	</Button>
	<Button
		class="proximo"
		size="lg"
		color="primary"
		on:click={() => ($storeCenas = scene4)}
	>
		Próximo
	</Button>
</div>

<!-- HTML -->
<div>
	<LayoutQuiz {questoes} />
</div>

<!-- CSS -->
<style>
</style>
