import {writable} from "svelte/store";

export const play_mode = writable<string | null>(null);