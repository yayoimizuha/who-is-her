<script>
    // import Counter from './Counter.svelte';
    // import welcome from '$lib/images/svelte-welcome.webp';
    import og_image from '$lib/images/ogp.png';
    import PlayButton from "./PlayButton.svelte";
</script>

<svelte:head>
    <title>この目元は誰？</title>
    <meta name="description" content="この目元は誰？"/>
    <meta property="og:url" content="https://hello-eyemask-quiz.web.app/"/>
    <meta property="og:type" content="website"/>
    <meta property="og:title" content="この目元は誰？"/>
    <meta property="og:description" content="これは9月FC通販ソロアイマスクの画像から切り取った目元の画像から、それが誰かを当てるクイズアプリです。"/>
    <meta property="og:site_name" content="この目元は誰？"/>
    <meta property="og:image" content="{og_image}"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:site" content="@yayoi_mizuha">
    <meta name="twitter:title" content="この目元は誰？">
    <meta name="twitter:description" content="これは9月FC通販ソロアイマスクの画像から切り取った目元の画像から、それが誰かを当てるクイズアプリです。">
    <meta name="twitter:image" content="{og_image}">
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
