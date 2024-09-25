<script>
    import Header from './Header.svelte';
    import '../app.css';
    import og_image from "$lib/images/ogp.png";


</script>
<svelte:head>
    <title>この目元は誰？</title>
    <meta name="description" content="この目元は誰？"/>
    <meta property="og:url" content="https://hello-eyemask-quiz.web.app/"/>
    <meta property="og:type" content="website"/>
    <meta property="og:title" content="この目元は誰？"/>
    <meta property="og:description"
          content="これは9月FC通販ソロアイマスクの画像から切り取った目元の画像から、それが誰かを当てるクイズアプリです。"/>
    <meta property="og:site_name" content="この目元は誰？"/>
    <meta property="og:image" content="https://hello-eyemask-quiz.web.app{og_image}"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:site" content="@yayoi_mizuha">
    <meta name="twitter:title" content="この目元は誰？">
    <meta name="twitter:description"
          content="これは9月FC通販ソロアイマスクの画像から切り取った目元の画像から、それが誰かを当てるクイズアプリです。">
    <!--    <meta name="twitter:image" content="{og_image}">-->
</svelte:head>
<div class="app">
    <Header/>

    <main>
        <slot/>
    </main>

    <footer>
        <p>制作: <a href="https://x.com/yayoi_mizuha" target="_blank">@yayoi_mizuha</a> (画像の著作権はアップフロントインターナショナル社に属します。)
        </p>
    </footer>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BPY1S17CTR"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'G-BPY1S17CTR', {
            "cookie_domain": "none"
        });
    </script>

</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
    }

    footer a {
        font-weight: bold;
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>
