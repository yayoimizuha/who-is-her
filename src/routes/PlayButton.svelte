<script lang="ts">
    // import {writable} from "svelte/store";
    import {goto} from "$app/navigation";
    import {play_mode} from "$lib/shared_val";

    export let mode;
    export let text;
    const start_quiz = (mode: string) => {
        if (mode === "all") {
            play_mode.set("all");
        } else if (mode === "random") {
            play_mode.set("random");
        }
        // console.log(mode)
        // console.log("run start_quiz.", $play_mode);
        goto("/quiz");
    };
</script>

<button class="play {mode}" on:click={()=>start_quiz(mode)}>
    <h2 class="play_text">{text}</h2>
</button>
<style>
    .play_text {
        font-size: 32px;
        margin: 5px;
    }

    .play {
        position: relative;
        padding: 10px 20px;
        background-color: #ff3e00;
        color: antiquewhite;
        border: none;
        cursor: pointer;
        margin: 18px;
    }

    .play::after {
        content: "";
        position: absolute;
        top: 3px;
        right: 3px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 20px 20px 0;
        border-color: transparent white transparent transparent;
    }
</style>