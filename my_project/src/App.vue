<script setup lang="ts">
import {ref, onMounted,} from 'vue';
import { RouterView } from 'vue-router';

</script>

<template>

  <div>
    <header class="py-10">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold font-['Bitcount']">POKEMON PROJECT</h1>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

  </div>

</template>

<style scoped>
/* div{
  background-color: #faedd2;
} */
h1 {
  font-family: 'Bitcount', system-ui;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: 'slnt' 0, 'CRSV' 0.5, 'ELSH' 0, 'ELXP' 0;
  font-size: 3rem;
}

</style>
