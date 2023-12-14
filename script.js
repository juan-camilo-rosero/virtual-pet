import { includeHTML } from "./include_html.js"
import { changeFood, changeRoom, feed, loadPet, statsConfig } from "./pet.js"
import { searchPokemon } from "./pokemonAPI.js"
import { appearDiv, dissappearDiv } from "./transitions.js"

const d = document,
ls = localStorage,
$searchPokemon = d.querySelector(".pokemon-name-btn"),
$pokemonName = d.querySelector(".pokemon-name"),
$pokemonConfirmNo = d.querySelector(".confirm-pokemon-no"),
$pokemonConfirmYes = d.querySelector(".confirm-pokemon-yes")

d.addEventListener("DOMContentLoaded", e => {
    if(ls.getItem("name")) loadPet()
    else appearDiv("#select")
    $searchPokemon.addEventListener("click", e => searchPokemon($pokemonName.value))
    $pokemonConfirmNo.addEventListener("click", e => {
        dissappearDiv(".confirm-pokemon")
        appearDiv(".select-pokemon")
    })
    $pokemonConfirmYes.addEventListener("click", e => {
        loadPet()
    })
    statsConfig(".stats figure div")
    d.querySelectorAll("[data-include]")
    .forEach((el) => includeHTML(el, el.getAttribute("data-include")));
    changeRoom(["dormitorio", "cocina", "parque"], ".next", ".previous", ".room")
})