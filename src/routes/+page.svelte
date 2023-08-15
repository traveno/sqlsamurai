<script lang="ts">
  import hero from '$lib/assets/samurai.jpeg';
  import { base } from '$app/paths';
</script>

<div class="container max-w-screen-lg bg-neutral rounded-lg text-neutral-100 overflow-hidden ml-16 my-16 shadow-xl">
  <div class="relative">
    <div class="absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-neutral"></div>
    <img src={hero} alt="Our hero!" />
    
  </div>
  <div class="p-8">
    <article class="prose prose-invert">
      <h1>SQL Samurai Homepage</h1>
      <p>Welcome to our index. Links for different entities can be found on the left.</p>
      <p>CS340 Project Group 74 — Stephen Fike & Nicole Nesbitt</p>
      <i>Enjoy your stay, have some cake!</i>
    </article>
  </div>
</div>