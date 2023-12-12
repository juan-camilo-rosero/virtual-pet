import { includeHTML } from "./include_html.js"
import { appearDiv, dissappearDiv } from "./transitions.js"

const d = document,
ls = localStorage

export const firstStepSuccess = data => {
    const $img = d.querySelector(".pokemon-img"),
    imgUrl = data["sprites"]["other"]["official-artwork"]["front_default"]
    dissappearDiv(".select-pokemon")
    appearDiv(".confirm-pokemon")

    $img.setAttribute("src", imgUrl)
    ls.setItem("image", imgUrl)
    ls.setItem("name", data["name"])
}

export const firstStepError = err => {
    alert("El pokemon ingresado no existe, intenta nuevamente")
}

export const loadPet = () => {
    const $img = d.querySelector(".pet-img")

    dissappearDiv("#select")
    appearDiv("main")

    const petImg = ls.getItem("image")

    $img.setAttribute("src", petImg)
}

export const changeRoom = (rooms, next, prev, name) => {
    const $name = d.querySelector(name),
    $next = d.querySelector(next),
    $prev = d.querySelector(prev),
    $controls = d.querySelector(".controls")

    let actualRoom = $name.textContent,
    index = rooms.indexOf(actualRoom)

    $next.addEventListener("click", e => {
        (index === (rooms.length - 1))
        ? index = 0
        : index += 1
        $name.textContent = rooms[index]
        includeHTML($controls, rooms[index])
    })

    $prev.addEventListener("click", e => {
        (index === 0)
            ? index = (rooms.length - 1)
            : index -= 1
            $name.textContent = rooms[index]
            includeHTML($controls, rooms[index])
    })
}

/* ******************** Food ******************** */

export const feed = (foodImg, petDiv) => {
    const $foodImg = document.querySelector(foodImg),
      $petDiv = document.querySelector(petDiv);
  
    $foodImg.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', 'food'); // Establecer un tipo de dato a transferir
    });
  
    $petDiv.addEventListener('dragover', (event) => {
      event.preventDefault(); // Prevenir el comportamiento por defecto
    });
  
    $petDiv.addEventListener('drop', (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('text'); // Obtener el tipo de dato transferido
      if (data === 'food') {
        alert("Has alimentado a tu mascota")
      }
    });
};
  