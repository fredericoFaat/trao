<script>
    import { onMount } from "svelte";
    import { Button } from "sveltestrap";

    import storeCenas from "../store/storeCenas";

    import u01Inicio from "./u01Inicio.svelte";
    import scene2 from "./u01s01i02.svelte";


    
    onMount(() => {});

   let users = [];

    function adduser() {
        let user = { username: "kk", password: 555 };
        fetch("http://localhost:3000/users", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function getuser() {
        fetch("http://192.168.0.116:3000/users")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed");
                }
                return res.json();
            })
            .then((data) => {
                users = Object.values(data);
                console.log(users);
            })
            .catch((err) => {
                console.log(err);
            });
    }



    //   let scanner = new Instascan.Scanner({
    //     video: document.getElementById('preview')
    //   });

    //   scanner.addListener('scan', function (content) {
    //     console.log(content);
    //   });

    //   Instascan.Camera.getCameras().then(function (cameras) {
    //     if (cameras.length > 0) {
    //       scanner.start(cameras[0]);
    //     } else {
    //       console.error('No cameras found.');
    //     }
    //   }).catch(function (e) {
    //     console.error(e);
    //   });
</script>




    <!-- svelte-ignore a11y-media-has-caption -->
    <!-- <video id="preview"></video> -->
    








<!-- HTML FIXO -->
<div>
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
</div>

<!-- HTML -->
<div style="margin:0.5rem;">
    <Button size="lg" color="warning" on:click={adduser}>anim1</Button>
    <Button size="lg" color="warning" on:click={getuser}>anim2</Button>
</div>

<div class="palco">

<ul>
	{#each users as user}
		<li>{user.username}</li>
	{/each}
</ul>
</div>


<!-- CSS -->
<style>
    .palco {
        position: absolute;
        top: 0;
        left: 0;
        background-color: white;
        z-index: 1;
    }
</style>