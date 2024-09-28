<script lang="ts">
    import {play_mode, already, result, all_questions} from "$lib/shared_val";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import {onMount} from "svelte";

    onMount(() => {
        already.set([]);
        result.set([]);
    })
    let eye_mask_data: { [key: string]: { [key: string]: string } } | null = null;
    if (browser) {
        fetch("/data.json").then(res => res.json()).then(data => {
            eye_mask_data = data;
            // console.info(eye_mask_data);
        })
    }
    $:{
        if (eye_mask_data != null) {
            generate_question();
        }
    }
    let correct_name: string = ""
    let image_base64: string = ""
    // let answered_questions = 0;
    const ans_submit = () => {
        let value = ""
        if (browser) {
            value = (document.getElementById("ans_select") as HTMLSelectElement).value;
            (document.getElementById("ans_select") as HTMLSelectElement).selectedIndex = 0;
        }
        result.update(x => {
            x.push(value);
            return x;
        })
        if (value == correct_name) {
            console.info("正解!");
        } else {
            console.info("不正解", correct_name);
        }
        console.log($result, "\n", $already);
        if ($result.length == $all_questions) {
            goto("/result");
            return;
        } else {
            generate_question();
            handle_change({currentTarget: document.getElementById("ans_select")! as HTMLSelectElement});
        }
    }
    const generate_question = () => {
        console.log("called generate_question");
        const members = ([] as string[]).concat(
            ...Object.keys(eye_mask_data!).map(x => Object.keys(eye_mask_data![x])));
        play_mode.subscribe(mode => {
            switch (mode) {
                case "all":
                    all_questions.set(members.length);
                    break
                case "random":
                    all_questions.set(10);
            }
        })
        let select_one;
        do {
            select_one = members[Math.floor(Math.random() * members.length)];
        } while ($already.includes(select_one)) ;
        const image_data = Object.keys(eye_mask_data!).map(x => {
            if (Object.keys(eye_mask_data![x]).includes(select_one)) {
                return eye_mask_data![x][select_one]
            } else {
                return null
            }
        }).filter(x => x)[0]
        let chooses = [select_one];
        let filtered_members = members.filter(v => !chooses.includes(v));
        for (let i = 0; i < 4; i++) {
            chooses.push(filtered_members[Math.floor(Math.random() * filtered_members.length)]);
            filtered_members = filtered_members.filter(v => !chooses.includes(v));
        }
        chooses = chooses.sort(() => Math.random() - 0.6)
        image_base64 = image_data!
        correct_name = select_one;
        already.update(x => {
            x.push(select_one);
            return x;
        })
        // console.log(select_one, image_data, chooses)
    }
    // generate_question();
    play_mode.subscribe(val => {
        // console.log(val);
        if (val == null && browser) {
            goto("/");
        }
    })
    let groups: Array<string> = [];
    $:if (null != eye_mask_data) {
        groups = Object.keys(eye_mask_data)
    }
    let able_to_go_next: boolean = true;
    const handle_change = (e: { currentTarget: HTMLSelectElement }) => {
        able_to_go_next = e.currentTarget.value === "";
        return e.currentTarget.value;
    }
    // $: members = groups.map((x) => [Object.keys(eye_mask_data[x])])
</script>

<div class="main">
    <!--    <p>-->
    <!--        Hello! {$play_mode}-->
    <!--    </p>-->
    <div class="progress_box">
        {#if $all_questions}
            <label for="progress">{$result.length}/{$all_questions}</label>
            <progress id="progress" value="{$result.length/$all_questions}" max="1.00" class="progress_bar"/>
        {/if}
    </div>
    <div class="eye_mask_image">
        <img src="data:image/jpeg;base64,{image_base64}" alt="who is her?">
        <!--    {groups}-->
        <!--    <br>-->
        <!--    {members}-->
    </div>
    <div class="ans_selector">
        {#if eye_mask_data != null}
            <label for="ans_select">解答を選択:</label>
            <select id="ans_select" on:change={handle_change}>
                <option value="">解答を選択してください。</option>
                {#each Object.keys(eye_mask_data) as dat}
                    <optgroup label="{dat}">
                        {#each Object.keys(eye_mask_data[dat]) as name}
                            <option value="{name}">{name}</option>
                        {/each}
                    </optgroup>
                {/each}
            </select>
        {/if}
    </div>
    <div class="go_next">
        <button disabled={able_to_go_next} on:click={ans_submit}>
            次へ進む
        </button>
    </div>
</div>


<style>
    .ans_selector {
        display: flex;
        padding: 0 20%;
    }

    .ans_selector select {
        flex-grow: 1;
        /*appearance: none;*/
        height: 30px;
    }

    .ans_selector label {
        margin: 3px;
    }

    .go_next {
        display: flex;
    }

    .go_next button {
        flex-grow: .4;
        margin: 20px auto auto;
    }

    .main {
        align-content: center;
    }

    .progress_box {
        width: 100%;
        display: flex;
        height: 30px;
    }

    .progress_box label {
        margin: 6px;
    }

    .progress_bar {
        -webkit-appearance: none;
        appearance: none;
        height: 30px;
        flex-grow: 0.9;
        margin: 0 20px 0 20px;
        border-radius: 10px;
        background-color: darkgray;
    }

    .progress_bar::-moz-progress-bar {
        border-radius: 10px;
        color: aqua;
        background-color: var(--color-theme-1);
    }

    .progress_bar::-webkit-progress-bar {
        background-color: darkgray;
        border-radius: 10px;
    }

    .progress_bar::-webkit-progress-value {
        /*height: 10px;*/
        background-color: var(--color-theme-1);
        border-radius: 10px;
    }

    .eye_mask_image {
        margin: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .eye_mask_image img {
        width: 60%;
        /*filter: grayscale(80%);*/
    }

</style>