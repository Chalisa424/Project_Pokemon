<script setup lang="ts">
import {ref, onMounted,} from 'vue';
import { RouterView } from 'vue-router';

// const pokemonList = ref([])

// const fetchPokemon = async () =>{
//   const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
//   pokemonList.value = await response.data
// }

// onMounted(() => {
//   fetchPokemon()
// })

// const getPokemonImage = (url:string) =>{
//   const id = url.split('/')[6];
//   return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
// }

</script>

<template>

  <div>
    <header class="py-10">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold font-['Bitcount']">POKEMON PROJECT</h1>
      </div>
    </header>


    <main>

       <!-- <div class="grid grid-cols-4 gap-10 px-10 py-10">
        <Card_Pokemon v-for="pokemon in pokemonList.results" :key = "pokemon.name" :coverimage="getPokemonImage(pokemon.url)" :name="pokemon.name" url:="pokemon.url" />

       </div> -->
      <RouterView />
    </main>
  </div>

</template>

<style scoped>

h1 {
  font-family: 'Bitcount', system-ui;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: 'slnt' 0, 'CRSV' 0.5, 'ELSH' 0, 'ELXP' 0;
  font-size: 3rem;
}

</style>
