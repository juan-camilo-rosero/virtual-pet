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
        height = ls.getItem("hunger")
        if (ls.getItem(food) === null) ls.setItem(food, 5)
        const amount = ls.getItem(food)
        if(amount >= 1){
            let newHeight = parseInt(height) + foodData["feed"]
            if(newHeight > 10) newHeight = 10

            ls.setItem(food, (amount - 1))
            ls.setItem("hunger", newHeight)
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
    
    if(!ls.getItem("hunger")){
        ls.setItem("hunger", 10)
        ls.setItem("energy", 10)
        ls.setItem("happiness", 10)
    }    
    setInterval(() => {
        const stats = [ls.getItem("hunger"), ls.getItem("energy"), ls.getItem("happiness")]
        $stats.forEach(($stat, index) => {
            if(stats[index]>= 0.2){
                stats[index] -= 0.05
                $stat.style.height = `${stats[index]}vh`
            }
            else {
                $stat.style.height = "0px"
            } // Código si la mascota se muere
        });
        ls.setItem("hunger", stats[0])
        ls.setItem("energy", stats[1])
        ls.setItem("happiness", stats[2])
    }, 1000);
}

export const restBtn = btn => {
    const $btn = d.querySelector(btn)

    $btn.addEventListener("click", e => {
        let state = $btn.getAttribute("data-state")

        if (state == "day"){
            $btn.setAttribute("src", "assets/images/moon.png")
            $btn.setAttribute("alt", "Hacer de día")
            $btn.setAttribute("data-state", "night")
            appearDiv(".sleeping")
        }
        else{
            $btn.setAttribute("src", "assets/images/sun.png")
            $btn.setAttribute("alt", "Hacer de noche")
            $btn.setAttribute("data-state", "day")
            dissappearDiv(".sleeping")
        }
    })
}

export const rest = (btn, stat) => {
    const $btn = d.querySelector(btn),
    $stat = d.querySelector(stat)

    if($btn && $btn.getAttribute("data-state") == "night"){
        let height = parseFloat(ls.getItem("energy")),
        newHeight = height + 0.5

        if(newHeight <= 10) {
            ls.setItem("energy", newHeight)
            $stat.style.height = `${newHeight}vh`
        }
        else{
            ls.setItem("energy", 10)
            $stat.style.height = `10vh`
        }
    }

}

export const shopControls = (openBtn, closeBtn, money) => {
    const $openBtn = d.querySelector(openBtn),
    $closeBtn = d.querySelector(closeBtn),
    $money = d.querySelector(money)

    $openBtn.addEventListener("click", e => {
        appearDiv(".shop")
        dissappearDiv(".pet")
        $money.textContent = `$${ls.getItem("money")}`
    })

    $closeBtn.addEventListener("click", e => {
        appearDiv(".pet")
        dissappearDiv(".shop")
    })
}