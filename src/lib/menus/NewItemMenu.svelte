<script lang="ts">
  import { arrow, createFloatingActions } from "svelte-floating-ui";
	import { offset, type Placement } from "svelte-floating-ui/core";
	import { writable } from "svelte/store";
	import { fade, fly } from "svelte/transition";
  import { autoPlacement, flip } from "svelte-floating-ui/dom";

  let showTooltip = false;
  const arrowRef = writable<HTMLElement>(null!);
  export let placement: Placement = 'bottom';
  export let mode: 'new' | 'edit' = 'new';
  export let endpoint: string;

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement,
    middleware: [
      offset({ mainAxis: 20 }),
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

  async function onSubmit(event: any) {
    buttonsDisabled = true;
    loading = true;

    const formData = new FormData(event.target);
    const data: { [key:string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    console.log(JSON.stringify(data));
    const response = await fetch(`${endpoint}/${mode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    setTimeout(() => {
      loading = false;
      buttonsDisabled = false;
      showTooltip = false;
      location.reload();
    }, 500);
  }
</script>

<div use:floatingRef on:click={() => showTooltip = !showTooltip} class="{showTooltip ? 'z-20' : ''}">
  <slot />
</div>

{#if showTooltip}
<div class="absolute max-w-lg w-80 z-20" use:floatingContent transition:fly={{ y: 25, duration: 250 }}>

  <!-- Arrow -->
  <div class="absolute bg-primary w-[20px] h-[20px] pointer-events-none " style="z-index: -25;" bind:this={$arrowRef}>
  </div>

  <div class="w-full rounded-2xl bg-base-200 border-2 border-primary flex flex-col gap-2 text-neutral-content shadow-md shadow-black/25">

    {#if loading}
    <div class="absolute top-0 left-0 rounded-2xl w-full h-full bg-gradient-to-br from-primary/60 to-primary flex flex-col justify-center items-center gap-4" transition:fade={{ duration: 150 }}>
      <div class="animate-spin inline-block w-12 h-12 border-[5px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="text-sm font-thin italic text-white">Processing... 👍</div>
    </div>
    {/if}
    
    <!-- New Item Dialog -->
    <div class="text-xl text-center font-thin bg-neutral z-10 p-4 text-neutral-content rounded-t-2xl">{mode === 'new' ? 'New entry in ' : 'Editing row in '}<span class="font-mono font-bold"><slot name="entity" /></span></div>

    <div class="p-4">
      <form id="form" on:submit|preventDefault={onSubmit}>
        <slot name="form"></slot>
      </form>
    </div>
    

    <div class="flex flex-row justify-end gap-4 z-10 p-4 bg-neutral text-neutral-content rounded-b-2xl">
      <button class="btn btn-sm btn-ghost font-light" on:click={() => showTooltip = false} disabled={buttonsDisabled}>Cancel</button>
      <button type="submit" form="form" class="btn btn-sm btn-primary" disabled={buttonsDisabled}>Submit</button>
    </div>
  </div>
</div>

<div class="fixed w-screen h-screen top-0 left-0 bg-black/20 z-10" transition:fade={{ duration: 250 }} on:click={() => showTooltip = false}></div>
{/if}

