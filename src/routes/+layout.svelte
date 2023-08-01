<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { fly, scale } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import SidebarTooltip from '$lib/utils/SidebarTooltip.svelte';
  import { onMount } from 'svelte';
  import JSConfetti from 'js-confetti';
  import { confettiMachine } from '$lib/store';
  import toast, { Toaster } from 'svelte-french-toast';

  export let data;

  const duration = 300;
  const delay = duration + 100;
  const y = 10;

  const transitionIn = { easing: cubicOut, y, duration, delay };
  const transitionOut = { easing: cubicIn, y: -y, duration };

  onMount(() => {
    const jsConfetti = new JSConfetti();
    confettiMachine.set(jsConfetti);
  })
</script>

<svelte:head>
  <title>SQL Samurai</title>
</svelte:head>

<Toaster />

<div class="fixed w-screen h-screen top-0 left-0 from-base-200 to-slate-800 bg-gradient-to-br -z-10"></div>

<div class="flex flex-row justify-start">
  <div class="sticky left-0 top-0 flex h-screen flex-col justify-start items-center gap-4 px-4 py-8 z-10 bg-base-300">
    <div class="text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 512 512"><path fill="currentColor" d="m356.1 32.57l50 25c-2.2 8.68-9.2 22.47-20.1 37.29C372.7 113 354.4 133.3 335.6 152c-18.7 18.8-38.1 36.2-53.5 48.7c-7.7 6.2-14.5 11.3-19.6 14.6c-2.5 1.6-4.6 2.9-6 3.6c-.3.1-.3.1-.5.1s-.2 0-.5-.1c-1.4-.7-3.5-2-6-3.6c-5.1-3.3-11.9-8.4-19.6-14.6c-15.4-12.5-34.8-29.9-53.5-48.7c-18.8-18.7-37.1-39-50.4-57.13c-10.9-14.83-17.9-28.62-20.1-37.3l50-25c14.6 29.73 29.3 62.14 44.2 90.03c16.2 30.5 31.6 55.7 51.9 65.9l4 2l4-2c20.3-10.2 35.7-35.4 51.9-65.9c14.9-27.89 29.6-60.31 44.2-90.03zM256 141.4c7.9 0 15.5.7 22.7 1.9c-8.2 12.2-16 21.5-22.7 26.5c-6.7-5-14.5-14.3-22.7-26.5c7.2-1.2 14.8-1.9 22.7-1.9zm83.1 32.5c23.3 22.7 35.9 54.6 35.9 86.5v.6c-33-12-75.9-17.6-119-17.6c-43.1 0-86 5.6-119 17.6v-.6c0-31.9 12.6-63.8 35.9-86.5c16.2 15.6 32.2 29.8 45.7 40.7c8 6.5 15.1 11.9 21 15.7c2.9 2 5.5 3.5 8 4.7c2.5 1.2 4.4 2.4 8.4 2.4s5.9-1.2 8.4-2.4s5.1-2.7 8-4.7c5.9-3.8 13-9.2 21-15.7c13.5-10.9 29.5-25.1 45.7-40.7zm64.3 38.3c20.6 20 31.5 26.2 63.8 37.3c-12.6 24.9-25.9 47.1-57 61.2l-17.3-52c-.1-5.7-.5-11.4-1.3-17.1zm-294.8 0l11.8 29.4c-.8 5.7-1.2 11.4-1.3 17.1l-17.3 52c-31.11-14.1-44.41-36.3-57.01-61.2c32.3-11.1 43.2-17.3 63.81-37.3zM265 261.5c45.1.9 89.3 8.7 117.2 22.2l28.4 85l-43.3-19.8c-3.9-23.6-6.3-46.3-6.3-58.5v-14.6l-13 6.5c-27.9 14-55.5 21.6-83 23zm-18 0v43.8c-27.5-1.4-55.1-9-83-23l-13-6.5v14.6c0 12.2-2.4 34.9-6.3 58.5l-43.3 19.8l28.4-85c27.9-13.5 72.1-21.3 117.2-22.2zm96.6 42.8c1.3 18.6 4.8 43.5 9.6 67.6c3 15.4 6.6 30.2 10.5 42.4c3.9 12.3 7.3 21.8 13.9 28.5l2.7 2.6h3.7c14.1 0 38.9 1.2 52.7 9.6c-1.8 1.4-4.8 3.2-8.7 4.9c-9.4 4-23.9 7.7-41.5 10.6c-35.2 5.9-82.9 8.9-130.5 8.9c-47.6 0-95.3-3-130.5-8.9c-17.6-2.9-32.11-6.6-41.51-10.6c-3.9-1.7-6.9-3.5-8.7-4.9c13.7-8.4 38.61-9.6 52.71-9.6h3.7l2.7-2.6c6.6-6.7 10-16.2 13.9-28.5c3.9-12.2 7.5-27 10.5-42.4c4.8-24.1 8.3-49 9.6-67.6c58 25.3 117.2 25.3 175.2 0zm-202.8 66.2c-2.9 14.1-6.2 27.6-9.6 38.4c-2.9 9.1-6.1 15.3-8.1 18.5c-11.2-.1-27.71 0-43.01 5.1l13.5-40.4zm230.4 0l47.2 21.6l13.5 40.4c-15.3-5.1-31.8-5.2-43-5.1c-2-3.2-5.2-9.4-8.1-18.5c-3.4-10.8-6.7-24.3-9.6-38.4z"/></svg>
      <div class="font-mono text-3xl text-center font-semibold">SQL</div>
    </div>


    <SidebarTooltip activeRoute={data.route.id === `/`}>
      <div slot="text" class="flex flex-col justify-center items-center h-full"><div class="">Home</div></div>
        <div class="h-14 w-20 rounded-lg hover:bg-slate-700 hover:rounded-r-none transition {data.route.id === `/` ? 'bg-info text-info-content hover:!bg-info hover:!text-info-content' : 'text-cyan-400'}">
          <a href="{base}/" class="h-14 w-20 flex flex-row justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </a>
        </div>
    </SidebarTooltip>

     <div class="divider divider-vertical m-0"></div>

    <SidebarTooltip activeRoute={data.route.id === '/clans'}>
      <div slot="text" class="flex flex-col justify-center items-center h-full"><div class="">Clans</div></div>
        <div class="h-14 w-20 rounded-lg hover:bg-slate-700 hover:rounded-r-none transition {data.route.id === '/clans' ? 'bg-info text-info-content hover:!bg-info hover:!text-info-content' : 'text-blue-400'}">
          <a href="{base}/clans" class="h-14 w-20 flex flex-row justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M15 8h-5"/><path d="M15 12h-5"/></svg>
          </a>
        </div>
    </SidebarTooltip>

     <SidebarTooltip activeRoute={data.route.id === '/nemeses'}>
      <div slot="text" class="flex flex-col justify-center items-center h-full"><div class="">Nemeses</div></div>
        <div class="h-14 w-20 rounded-lg hover:bg-slate-700 hover:rounded-r-none transition {data.route.id === '/nemeses' ? 'bg-info text-info-content hover:!bg-info hover:!text-info-content' : 'text-red-400'}">
          <a href="{base}/nemeses" class="h-14 w-20 flex flex-row justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M14 19a6 6 0 0 0-12 0"/><circle cx="8" cy="9" r="4"/><path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"/></svg>
          </a>
        </div>
    </SidebarTooltip>

     <SidebarTooltip activeRoute={data.route.id === '/warriors'}>
      <div slot="text" class="flex flex-col justify-center items-center h-full"><div class="">Warriors</div></div>
        <div class="h-14 w-20 rounded-lg hover:bg-slate-700 hover:rounded-r-none transition {data.route.id === '/warriors' ? 'bg-info text-info-content hover:!bg-info hover:!text-info-content' : 'text-orange-300'}">
          <a href="{base}/warriors" class="h-14 w-20 flex flex-row justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>
          </a>
        </div>
    </SidebarTooltip>

     <SidebarTooltip activeRoute={data.route.id === '/defense_masters'}>
      <div slot="text" class="flex flex-col justify-center items-center h-full"><div class="">Masters</div></div>
        <div class="h-14 w-20 rounded-lg hover:bg-slate-700 hover:rounded-r-none transition {data.route.id === '/defense_masters' ? 'bg-info text-info-content hover:!bg-info hover:!text-info-content' : 'text-teal-500'}">
          <a href="{base}/defense_masters" class="h-14 w-20 flex flex-row justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          </a>
        </div>
    </SidebarTooltip>

     <SidebarTooltip activeRoute={data.route.id === '/towns'}>
      <div slot="text" class="flex flex-col justify-center items-center h-full"><div class="">Towns</div></div>
        <div class="h-14 w-20 rounded-lg hover:bg-slate-700 hover:rounded-r-none transition {data.route.id === '/towns' ? 'bg-info text-info-content hover:!bg-info hover:!text-info-content' : 'text-stone-400'}">
          <a href="{base}/towns" class="h-14 w-20 flex flex-row justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </a>
        </div>
    </SidebarTooltip>

     <SidebarTooltip activeRoute={data.route.id === '/equipment'}>
      <div slot="text" class="flex flex-row justify-center items-center h-full"><div class="">Equipment</div></div>
        <div class="h-14 w-20 rounded-lg hover:bg-slate-700 hover:rounded-r-none transition {data.route.id === '/equipment' ? 'bg-info text-info-content hover:!bg-info hover:!text-info-content' : 'text-emerald-400'}">
          <a href="{base}/equipment" class="h-14 w-20 flex flex-row justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M4 20V10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5"/><path d="M8 10h8"/><path d="M8 18h8"/></svg>
          </a>
        </div>
    </SidebarTooltip>

     <SidebarTooltip activeRoute={data.route.id === '/warriors_masters'}>
      <div slot="text" class="flex flex-row justify-center items-center h-full gap-2">
        <span>Warriors</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><polyline points="18 8 22 12 18 16"/><polyline points="6 8 2 12 6 16"/><line x1="2" x2="22" y1="12" y2="12"/></svg>
        <span>Masters</span>
      </div>
        <div class="h-14 w-20 rounded-lg hover:bg-slate-700 hover:rounded-r-none transition {data.route.id === '/warriors_masters' ? 'bg-info text-info-content hover:!bg-info hover:!text-info-content' : 'text-gray-400'}">
          <a href="{base}/warriors_masters" class="h-14 w-20 flex flex-row justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><path d="M4 9a2 2 0 0 1-2-2V5h6v2a2 2 0 0 1-2 2Z"/><path d="M3 5V3"/><path d="M7 5V3"/><path d="M19 15V6.5a3.5 3.5 0 0 0-7 0v11a3.5 3.5 0 0 1-7 0V9"/><path d="M17 21v-2"/><path d="M21 21v-2"/><path d="M22 19h-6v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>
          </a>
        </div>
    </SidebarTooltip>

    <div class="grow"></div>

    <SidebarTooltip>
      <div slot="text" class="select-none flex flex-row justify-center items-center h-full gap-2"><span>???</span></div>
      <div role="none" class="cursor-pointer text-pink-500 flex flex-row justify-center items-center h-14 w-20 hover:bg-slate-700 rounded-lg hover:rounded-r-none transition" on:click={() => $confettiMachine.addConfetti()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="9" cy="7" r="2"/><path d="M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6"/><path d="M16 13H3"/><path d="M16 17H3"/></svg>
      </div>
    </SidebarTooltip>

  </div>

  <div class="w-full">
  {#key data.pathname}
    <div in:fly={transitionIn} out:fly={transitionOut}>
      <slot />
    </div>
  {/key}
  </div>
</div>