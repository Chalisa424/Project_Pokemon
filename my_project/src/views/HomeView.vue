<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { fetchPokemonList } from '@/api/Pokemon_Api'
import Card_Pokemon from '@/components/Card_Pokemon.vue'
import Pagination from '@/components/Pagination.vue'
import axios from 'axios'

const pokemonList = ref({ results: [] })
const originalList = ref({ results: [] }) //keep original list information
const currentPage = ref(1)
const itemsPerPage = 20
const totalItems = ref(0)
const searchText = ref('')

const loadPokemon = async (page: number) => {
  try {
    const offset = (page - 1) * itemsPerPage
    const response = await fetchPokemonList(offset, itemsPerPage)
    pokemonList.value = response
    originalList.value = { ...response }
    totalItems.value = response.count
    currentPage.value = page
  } catch (error) {
    console.error('Error loading Pokémon:', error)
  }
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

let searchTimeout: number
watch(searchText, (newValue) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    handleSearch()
  }, 300) // Debounce for 300ms
})


const handleSearch = (event: KeyboardEvent) => {
  if (searchText.value === '') {
    pokemonList.value.results = originalList.value.results
    totalItems.value = originalList.value.results.length
  } else {
    const filteredResults = pokemonList.value.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.value.toLowerCase())
    )
    pokemonList.value.results = filteredResults
    totalItems.value = filteredResults.length
  }

  currentPage.value = 1
}



</script>

<template>
  <div>
    <form class="max-w-xl mx-auto" @submit.prevent="handleSearch">
      <div class="relative">
        <input
          type="search"
          id="default-search"
          v-model="searchText"
          @keyup="handleSearch"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-black rounded-full bg-white"
          placeholder=" Search..."
          required
        />
        <button
          type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>

    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-center my-6">Pokémon List</h1>
    <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 my-4">
      <Card_Pokemon
        v-for="pokemon in pokemonList.results"
        :key="pokemon.name"
        :coverimage="getPokemonImage(pokemon.url)"
        :name="pokemon.name"
        :url="pokemon.url"
        class="max-w-xs"
      />
    </div>
    </div>

    <Pagination
      v-if="pokemonList.results.length > 0"
      :currentPage="currentPage"
      :itemsPerPage="itemsPerPage"
      :totalItems="totalItems"
      @PageChanged="loadPokemon"
    />

  </div>
</template>
