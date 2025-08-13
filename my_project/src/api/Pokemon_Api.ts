import axios from "axios";

export const fetchPokemonList = async (offset:number, limit:number) =>{
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
  return response.data
}

export const fetchPokemonDetails = async (id:string) =>{
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  return response.data
}
