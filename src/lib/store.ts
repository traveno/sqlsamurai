import { writable } from "svelte/store";
import type JSConfetti from 'js-confetti';

export const confettiMachine = writable<JSConfetti>();