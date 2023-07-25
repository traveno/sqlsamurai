<script lang="ts">
    export let totalRows: number;
    export let lowerIndex: number;
    export let upperIndex: number;

    let pageSize = 12;
    let currentPage = 1;

    function changePage(newIndex: number) {
        currentPage = newIndex;
        lowerIndex = getLowerIndex();
        upperIndex = getUpperIndex();
    }

    export function getLowerIndex() {
        return pageSize * (currentPage - 1);
    }

    export function getUpperIndex() {
        return pageSize * currentPage > totalRows ? totalRows : pageSize * currentPage;
    }

    $: if (totalRows) {
        changePage(currentPage);
    }
</script>

<div class="flex flex-row items-center self-end">
    <button class="btn btn-sm btn-ghost disabled:bg-transparent" on:click={() => changePage(currentPage - 1)} disabled={lowerIndex === 0}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
    </button>
    <label class="w-48 text-center">Rows {upperIndex === 0 ? 0 : lowerIndex + 1} — {upperIndex} of {totalRows}</label>
    <button class="btn btn-sm btn-ghost disabled:bg-transparent" on:click={() => changePage(currentPage + 1)} disabled={upperIndex === totalRows}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </button>
</div>