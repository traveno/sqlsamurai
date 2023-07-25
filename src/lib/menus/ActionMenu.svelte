<script lang="ts">
	import { arrow, createFloatingActions } from "svelte-floating-ui";
	import { offset, shift } from "svelte-floating-ui/dom";
	import { writable } from "svelte/store";
	import { fade } from "svelte/transition";

  let showTooltip = false;
  const arrowRef = writable<HTMLElement>();

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement: 'bottom-end',
    middleware: [
      offset(20),
      shift(),
    ],
  });
</script>

<div use:floatingRef on:click={() => showTooltip = !showTooltip} class="{showTooltip ? 'z-20' : ''}">
  <slot />
</div>

{#if showTooltip}
<div class="absolute w-48 z-20" use:floatingContent transition:fade={{ duration: 150 }}>
  <ul class="menu menu-md bg-neutral text-neutral-content rounded-box">
    <li>
      <label for="edit" class="btn btn-ghost flex flex-row justify-start" on:click={() => showTooltip = false}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
      Edit
    </label>
  </li>
    <li>
      <label class="btn btn-ghost text-error flex flex-row justify-start" for="delete"  on:click={() => showTooltip = false}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      Delete
    </label>
  </li>
  </ul>
</div>

<div class="fixed w-screen h-screen top-0 left-0 bg-black/25 z-10" transition:fade={{ duration: 125 }} on:click={() => showTooltip = false}></div>
{/if}