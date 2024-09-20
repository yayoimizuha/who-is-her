<script>
    // import Counter from './Counter.svelte';
    // import welcome from '$lib/images/svelte-welcome.webp';
    // import welcome_fallback from '$lib/images/svelte-welcome.png';
    import PlayButton from "./PlayButton.svelte";
</script>

<svelte:head>
    <title>この目元は誰？</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<section>
    <h1>
        👁👁<br/>この目元は誰でしょう？
    </h1>
    <PlayButton mode="random" text="ランダムに10個出題"/>
    <PlayButton mode="all" text="全て出題"/>

    <!--	<Counter />-->
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }

    h1 {
        width: 100%;
    }

    /*.welcome {*/
    /*    display: block;*/
    /*    position: relative;*/
    /*    width: 100%;*/
    /*    height: 0;*/
    /*    padding: 0 0 calc(100% * 495 / 2048) 0;*/
    /*}*/

    /*.welcome img {*/
    /*    position: absolute;*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    top: 0;*/
    /*    display: block;*/
    /*}*/
</style>
