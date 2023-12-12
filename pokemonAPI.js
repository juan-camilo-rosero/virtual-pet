import { firstStepError, firstStepSuccess } from "./pet.js";

const d = document

export const searchPokemon = async (name) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const pokemonData = await res.json()
        firstStepSuccess(pokemonData)
    } catch (err) {
        firstStepError(err)
    }
}