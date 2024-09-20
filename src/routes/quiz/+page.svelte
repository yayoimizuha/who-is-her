<script lang="ts">
    import {play_mode} from "$lib/shared_val";

    play_mode.subscribe(val => {
        console.log(val);
    })
</script>
<div>
    <p>
        Hello! {$play_mode}
    </p>
</div>