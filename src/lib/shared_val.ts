import {writable} from "svelte/store";

export const play_mode = writable<string | null>(null);

export let already = writable<Array<string>>([])
export let result = writable<Array<string>>([])

export let all_questions = writable<number | null>(null);

