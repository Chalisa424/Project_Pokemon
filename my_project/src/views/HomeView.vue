<script setup lang="ts">
import { ref, onMounted , computed} from 'vue'
import {fetchPokemonList}  from '@/api/Pokemon_Api'
import Card_Pokemon from '@/components/Card_Pokemon.vue'
import Pagination from '@/components/Pagination.vue'

const pokemonList = ref({results: []})
const currentPage = ref(1)
const itemsPerPage = 20
const totalItems = ref(0)
const searchQuery = ref('')

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

const filteredPokemon = computed(()=>{
  return pokemonList.value.results.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div>
  <div v-if="pokemonList.results.length" class="grid grid-cols-4 gap-10 px-10 py-10">
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
