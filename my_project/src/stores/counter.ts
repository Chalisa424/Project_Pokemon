import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const fetchPokemon = async () =>{
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200')
  return await response.json
}
