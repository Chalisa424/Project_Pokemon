<script setup lang="ts">
import { ref, onMounted , computed} from 'vue'
import {fetchPokemonList}  from '@/api/Pokemon_Api'
import Card_Pokemon from '@/components/Card_Pokemon.vue'
import Pagination from '@/components/Pagination.vue'

const pokemonList = ref({results: []})
const currentPage = ref(1)
const itemsPerPage = 20
const totalItems = ref(0)
const searchText = ref('')

const loadPokemon = async (page: number) => {
  const offset = (page - 1) * itemsPerPage
  const response = await fetchPokemonList(offset, itemsPerPage)
  pokemonList.value = response
  totalItems.value = response.count
}

onMounted(() => {
  loadPokemon(currentPage.value)
})

const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage)
})

const getPokemonImage = (url: string) => {
  const id = url.split('/')[6]
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

const handleSearch = (event: KeyboardEvent) => {
 console.log(event.key)


  const filteredResults = pokemonList.value.results.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchText.value.toLowerCase())
  )

  pokemonList.value.results = filteredResults

}
</script>

<template>

  <div>
     <form class="max-w-xl mx-auto">
      <div class="relative">
         <input type="search"
         id="default-search"
         v-model="searchText"
         @keyup="handleSearch"
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-black rounded-full bg-white" placeholder=" Search..." required />
         <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700">Search</button>
      </div>

       </form>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-10 my-4">
    <Card_Pokemon
    v-for="pokemon in pokemonList.results"
    :key = "pokemon.name"
    :coverimage="getPokemonImage(pokemon.url)"
    :name="pokemon.name"
    />
    <!-- :url="pokemon.url" -->
  </div>

  <Pagination
    :currentPage="currentPage"
    :itemsPerPage="itemsPerPage"
    :totalItems="totalItems"
    @PageChanged="loadPokemon" />
  </div>

</template>
