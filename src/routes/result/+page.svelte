<svelte:head>
    <title>結果ページ</title>
</svelte:head>
<script lang="ts">
    import {all_questions, already, result} from "$lib/shared_val";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import {onMount} from "svelte";

    console.log($all_questions, $already.length);
    onMount(() => {
        if ($all_questions! != $already.length) {
            if (browser) goto("/");
        }
    })

    const fetchJson = async () => {
        return await (await fetch("/data.json")).json()
    }

    const get_image = (
        name: string, eye_mask_data: { [key: string]: { [key: string]: string } }): string | undefined => {
        console.log("getting image...", name)
        for (const group of Object.keys(eye_mask_data)) {
            for (const member of Object.keys(eye_mask_data[group])) {
                if (name === member) return eye_mask_data[group][member];
            }
        }
        return undefined;
    }
    const wrong_num = $already.map((v, i) => {
        return v == $result[i]
    }).filter(v => !v).length;

    let checked = true;
    $:console.log("state changed:", checked)
</script>
<div class="main">
    <p>※URL共有では結果が共有されないので、スクリーンショットを使ってください。</p>
    <div class="result_status">
        {#if $all_questions != null}
            {#if wrong_num === 0 }
                <b>全問正解!!({$all_questions}問)</b>
            {:else}
                <b>{$all_questions}問中{$all_questions - wrong_num}問正解!!</b>
            {/if}
        {/if}
    </div>
    <div class="toggle_block">
        <div class="toggle_button">
            <input type="checkbox" id="toggle" class="toggle_input" bind:checked={checked}/>
            <label for="toggle" class="toggle_label"/>
        </div>
        <div class="toggle_text">誤答のみを表示</div>
    </div>
    <div class="result_table">
        {#await fetchJson()}
            <p>ロード中...</p>
        {:then eye_mask_data}
            <table>
                <caption>正誤表</caption>
                <thead>
                <tr>
                    <th scope="col">問題</th>
                    <th scope="col">回答</th>
                </tr>
                </thead>
                <tbody>
                {#each $result as r,i}
                    {#if !checked || $already[i] !== r}
                        <tr>
                            <th>
                                <p>{$already[i]}</p>
                                <img src="data:image/jpeg;base64,{get_image($already[i],eye_mask_data)}"
                                     alt="{$already[i]}">
                            </th>
                            <th>
                                {#if $already[i] === r}
                                    <b style="color: cornflowerblue;font-size: 5vw">正解!</b>
                                {:else }
                                    <b style="color: red">不正解</b>
                                    <p>{r}は...</p>
                                    <img src="data:image/jpeg;base64,{get_image(r,eye_mask_data)}" alt="{r}">
                                {/if}
                            </th>
                        </tr>
                    {/if}
                {/each}
                </tbody>
            </table>
        {/await}
    </div>
</div>

<style>

    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }

    table img {
        width: min(400px, 35vw);
    }

    table th {
        padding: 10px 0;
        text-align: center;
        border: solid 2px #444444;
    }

    table tr:nth-child(odd) {
        background-color: #eee
    }

    .result_status {
        display: flex;
    }

    .result_status b {
        flex-grow: 1;
        font-size: 5vw;
        text-align: center;
    }

    caption {
        font-size: 3vw;
    }

    .toggle_input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 5;
        opacity: 0;
        cursor: pointer;
    }

    .toggle_label {
        width: 55px;
        height: 25px;
        background: #ccc;
        position: relative;
        display: inline-block;
        border-radius: 20px;
        transition: 0.4s;
        box-sizing: border-box;
    }

    .toggle_label:after {
        content: "";
        position: absolute;
        width: 25px;
        height: 25px;
        border-radius: 100%;
        left: 0;
        top: 0;
        z-index: 2;
        background: #fff;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        transition: 0.4s;
    }

    .toggle_input:checked + .toggle_label {
        background-color: #4BD865;
    }

    .toggle_input:checked + .toggle_label:after {
        left: 30px;
    }

    .toggle_button {
        position: relative;
        width: 55px;
        height: 25px;
        margin: 0 7px;
        align-content: flex-end;
    }

    .toggle_block {
        display: flex;
        justify-content: center;
    }

    .toggle_text {
        margin: 2px;
        font-size: 15px;
    }
</style>