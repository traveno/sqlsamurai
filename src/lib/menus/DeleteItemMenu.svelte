<script lang="ts">
  import { arrow, createFloatingActions } from "svelte-floating-ui";
	import { offset, type Placement } from "svelte-floating-ui/core";
	import { writable } from "svelte/store";
	import { fade, fly } from "svelte/transition";
  import toast from 'svelte-french-toast';
  import { autoPlacement, flip } from "svelte-floating-ui/dom";
  

  export let queued: string[] = [];
  export let disabled: boolean = false;

  let showTooltip = false;
  const arrowRef = writable<HTMLElement>(null!);
  export let placement: Placement = 'bottom';

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement,
    middleware: [
      offset({ mainAxis: 25 }),
      autoPlacement(),
      arrow({ element: arrowRef }),
    ],
    onComputed({ placement, middlewareData }) {
      const { x, y } = middlewareData.arrow!;
      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right'
      }[placement.split('-')[0]];
      if (!$arrowRef) return;
      Object.assign($arrowRef.style, {
        left: x != null ? `${x}px` : '',
        top: y != null ? `${y}px` : '',
        [staticSide!]: '-10px',
        transform: 'rotate(45deg)'
      });
    }
  });

  let loading = false;
  let buttonsDisabled = false;

  function fakeLoad() {
    loading = true;
    buttonsDisabled = true;
    setTimeout(() => {
      loading = false;
      showTooltip = false;
      buttonsDisabled = false;
      toast.success('Saved successfully', {
        icon: '🎉',
        className: 'text-2xl',
        style: 'background-color: rgb(42, 50, 60); color: rgb(166, 173, 186); border: 1px solid rgb(25, 25, 25);',
        position: 'bottom-center',
        duration: 4000
      });
    }, 1500);
  }

  function launchModal() {
    if (disabled) return;
    showTooltip = !showTooltip;
  }
</script>

<div use:floatingRef on:click={() => launchModal()} class="{showTooltip ? 'z-20' : ''}">
  <slot />
</div>

{#if showTooltip}
<div class="absolute z-20 w-80 max-w-lg" use:floatingContent transition:fly={{ y: 25, duration: 200 }}>
  <!-- Arrow -->
  <div class="absolute bg-error w-[20px] h-[20px] pointer-events-none -z-10" bind:this={$arrowRef}></div>

  <div class="w-full min-h-16 rounded-2xl justify-between bg-base-200 text-neutral-content border-2 border-error transition flex flex-col gap-2 shadow-md shadow-black/25">

    {#if loading}
    <div class="absolute top-0 left-0 rounded-2xl w-full h-full bg-gradient-to-br from-red-600/60 to-error flex flex-col justify-center items-center gap-4" transition:fade={{ duration: 150 }}>
      <div class="animate-spin inline-block w-12 h-12 border-[5px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="text-sm font-thin italic text-white">Pretend I'm talking to the backend 👍</div>
    </div>
    {/if}
    
    <!-- New Item Dialog -->
    <div class="text-xl text-center font-thin bg-neutral z-10 p-4 text-neutral-content rounded-t-2xl">Delete from <span class="font-bold font-mono"><slot name="entity" /></span></div>
    
    <div class="flex flex-col gap-2 justify-center items-center font-mono p-4 my-4">
      {#each queued as q}
        <div>{q}</div>
      {/each}
    </div>
    <!-- <div class="font-thin text-center">{queued.length} {queued.length === 1 ? 'row' : 'rows'} total</div> -->
    <div class="flex flex-row justify-end gap-4 z-10 p-4 bg-neutral text-neutral-content rounded-b-2xl">
      
      <button class="btn btn-sm btn-ghost font-light" on:click={() => showTooltip = false} disabled={buttonsDisabled}>Cancel</button>
      <button class="btn btn-sm btn-error" on:click={() => fakeLoad()} disabled={buttonsDisabled}>Confirm</button>
    </div>
  </div>
</div>

<div class="fixed w-screen h-screen top-0 left-0 bg-black/25 z-10" transition:fade={{ duration: 125 }} on:click={() => showTooltip = false}></div>
{/if}

