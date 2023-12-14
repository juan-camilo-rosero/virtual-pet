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

export const feed = (image, btn) => {
    const $btn = document.querySelector(btn),
    $image = document.querySelector(image)

    $btn.addEventListener("click", e => {
        const food = $image.getAttribute("alt")
    })
};

export const changeFood = (prev, next, image, imagesArr) => {
    const $prev = d.querySelector(prev),
    $next = d.querySelector(next),
    $image = d.querySelector(image)

    $next.addEventListener("click", e => {
        const image = $image.getAttribute("alt")
        let index = imagesArr.indexOf(image);
        (index === (imagesArr.length - 1))
        ? index = 0
        : index += 1

        $image.setAttribute("alt", imagesArr[index])
        $image.setAttribute("src", `assets/images/${imagesArr[index]}.png`)
    })

    $prev.addEventListener("click", e => {
        const image = $image.getAttribute("alt")
        let index = imagesArr.indexOf(image);
        (index === 0)
        ? index = (imagesArr.length - 1)
        : index -= 1

        $image.setAttribute("alt", imagesArr[index])
        $image.setAttribute("src", `assets/images/${imagesArr[index]}.png`)
    })
}

export const statsConfig = stat => {
    const $stats = d.querySelectorAll(stat)
    
    if(!ls.getItem("stats")) ls.setItem("stats", "10,10,10")

    console.log(ls.getItem("stats").split(","));
    
    setInterval(() => {
        const stats = ls.getItem("stats").split(",")
        $stats.forEach(($stat, index) => {
            if(stats[index]>= 0.2){
                stats[index] -= 0.05
                $stat.style.height = `${stats[index]}vh`
            }
            else {
                $stat.style.height = "0px"
            } // Código si la mascota se muere
        });
        ls.setItem("stats", stats)
    }, 1000);
}