<script lang="ts">
  import { clans } from "$lib/data";
  import EntryMenu from "$lib/menus/ActionMenu.svelte";
    import DeleteItemMenu from "$lib/menus/DeleteItemMenu.svelte";
  import NewItemMenu from "$lib/menus/NewItemMenu.svelte";
  import Paginate from "$lib/utils/Paginate.svelte";

  let entity = 'clans';
  let entitySingle = 'clan';
  let array = clans;
  let currentId = 0;
  let lowerIndex = 0;
  let upperIndex = 0;
  let selectableArray = array.map(a => ({ checked: false, obj: a }));
</script>

<div class="container max-w-screen-lg bg-neutral text-neutral-content rounded-lg ml-16 my-16 shadow-xl">
  <div class="p-8 flex flex-col gap-8">
    <div class="flex flex-row justify-start items-center gap-4">
      <div class="font-mono text-3xl">{entity}</div>
      <div class="flex-grow"></div>
      <NewItemMenu>
        <span slot="entity">clans</span>
        <button class="btn btn-primary btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          New
        </button>
        <div slot="form">
          {#each Object.entries(array[currentId]) as [name, value], i}
            <div class="form-control w-full max-w-xs text-neutral-content">
              <label for="id" class="label"><span class="label-text font-light">{name}</span></label>
              <input name="id" type="text" class="input bg-base-100 input-bordered border-base-content/25 font-light" value={i === 0 ? 'auto_increment' : ''} disabled={i === 0}>
            </div>
          {/each}
        </div>
      </NewItemMenu>
      <DeleteItemMenu disabled={selectableArray.filter(i => i.checked).length === 0} queued={selectableArray.filter(a => a.checked).map(a => `${a.obj.clan_name} (${a.obj.clan_id})`)}>
        <span slot="entity">clans</span>
        <button class="btn btn-error btn-outline btn-sm" disabled={selectableArray.filter(i => i.checked).length === 0}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          Delete
        </button>
      </DeleteItemMenu>
      <div class="divider divider-horizontal m-0"></div>
      <Paginate totalRows={array.length} bind:lowerIndex bind:upperIndex />
    </div>
    <!-- <div class="divider divider-vertical"></div> -->
    <table class="table">
      <thead>
        <tr>
          <th></th>
          {#each Object.entries(array[0]) as [key, value]}
            <th>{key}</th>
          {/each}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each selectableArray.slice(lowerIndex, upperIndex) as data, i}
            <tr class="transition {data.checked ? 'bg-red-600/20' : 'bg-neutral'}">
              <td><input class="checkbox" type="checkbox" bind:checked={data.checked} /></td>
              {#each Object.entries(data.obj) as [key, value]}
                <td>{value}</td>
              {/each}
              <td class="flex flex-row justify-end">
                <NewItemMenu placement="bottom-end" mode={'edit'}>
                  <span slot="entity">clans</span>
                  <button class="btn btn-ghost btn-sm text-neutral-content/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  </button>
                  <div slot="form">
                    {#each Object.entries(data.obj) as [name, value], i}
                      <div class="form-control w-full max-w-xs">
                        <label for="id" class="label"><span class="label-text font-light">{name}</span></label>
                        <input name="id" type="text" class="input font-light" value={i === 0 ? 'auto_increment' : value} disabled={i === 0}>
                      </div>
                    {/each}
                  </div>
                </NewItemMenu>
                <!-- <EntryMenu>
                  <button class="btn btn-ghost btn-sm" on:click={() => currentId = i}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-horizontal"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </button>
                </EntryMenu> -->
              </td>
            </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
