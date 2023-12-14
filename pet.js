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

export const feed = async (image, btn, stat, amount) => {
    const $btn = d.querySelector(btn),
    $image = d.querySelector(image),
    $stat = d.querySelector(stat),
    $amount = d.querySelector(amount),
    res = await fetch("db.json"),
    data = await res.json()

    $btn.addEventListener("click", e => {
        const food = $image.getAttribute("alt"),
        foodData = data["food"][food],
        height = ls.getItem("stats").split(",")
        if (ls.getItem(food) === null) ls.setItem(food, 5)
        const amount = ls.getItem(food)
        if(amount >= 1){
            let newHeight = parseFloat(height[0]) + foodData["feed"]
            if(newHeight > 10) newHeight = 10

            ls.setItem(food, (amount - 1))
            ls.setItem("stats", [newHeight, height[1], height[2]])
            $stat.style.height = `${newHeight}vh`
            $amount.textContent = `X${amount - 1}`
        }
        else{
            console.log("hola uwu");
        }
    })
};

export const changeFood = (prev, next, image, imagesArr, amount) => {
    const $prev = d.querySelector(prev),
    $next = d.querySelector(next),
    $image = d.querySelector(image),
    $amount = d.querySelector(amount)

    $next.addEventListener("click", e => {
        const image = $image.getAttribute("alt")
        let index = imagesArr.indexOf(image);
        (index === (imagesArr.length - 1))
        ? index = 0
        : index += 1

        $image.setAttribute("alt", imagesArr[index])
        $image.setAttribute("src", `assets/images/${imagesArr[index]}.png`);
        (!ls.getItem(imagesArr[index]))
        ? $amount.textContent = "X5"
        : $amount.textContent = "X"+ls.getItem(imagesArr[index])
    })

    $prev.addEventListener("click", e => {
        const image = $image.getAttribute("alt")
        let index = imagesArr.indexOf(image);
        (index === 0)
        ? index = (imagesArr.length - 1)
        : index -= 1

        $image.setAttribute("alt", imagesArr[index])
        $image.setAttribute("src", `assets/images/${imagesArr[index]}.png`);
        (!ls.getItem(imagesArr[index]))
        ? $amount.textContent = "X5"
        : $amount.textContent = "X"+ls.getItem(imagesArr[index])
    })
}

export const statsConfig = stat => {
    const $stats = d.querySelectorAll(stat)
    
    if(!ls.getItem("stats")) ls.setItem("stats", "10,10,10")
    
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