<script>
    import Header from './Header.svelte';
    import '../app.css';


</script>

<div class="app">
    <Header/>

    <main>
        <slot/>
    </main>

    <footer>
        <p>制作: <a href="https://x.com/yayoi_mizuha" target="_blank">@yayoi_mizuha</a> (画像の著作権はアップフロントインターナショナル社に属します。)</p>
    </footer>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BPY1S17CTR"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'G-BPY1S17CTR');
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
