import { buyProduct } from "./money.js"
import { changeFood, changeGame, feed, rest, restBtn, selectGame, shopControls, statsConfig } from "./pet.js"

const d = document,
ls = localStorage

export const includeHTML = async (el, place) => {
  try {
    const url = "assets/fragments/" + place + ".html",
    res = await fetch(url)

    if (res.ok) {
      const htmlText = await res.text()
      el.innerHTML = htmlText
      if (place === "cocina") {
        feed(".food-img", ".feed", ".stat-hunger", ".amount")
        changeFood(".food-prev", ".food-next", ".food-img",["burger", "hot-dog", "apple"], ".amount"),
        (ls.getItem("burger") === null)
        ? d.querySelector(".amount").textContent = "X5"
        : d.querySelector(".amount").textContent = "X" + ls.getItem("burger");
      }
      else if (place == "dormitorio"){
        restBtn(".rest-btn")
        
        const interval = setInterval(() => {
          rest(".rest-btn", ".stat-energy")
        }, 1000);
      }
      else if(place == "parque"){
        changeGame(".game-prev", ".game-next", ".game-img", ["fnaf", "pokemon"])
        selectGame(".game-img", ".play")
      }
      else if(place == "tienda"){
        shopControls(".shop-btn", ".close-shop", ".shop-money")
        buyProduct(".buy-product", "db.json", ".shop-money")
      }
    } else {
      const message =
        res.statusText ||
        "Error loading the file, verify that you are making the request by http or https"
      el.innerHTML = `<div><p>Error ${res.status}: ${message}</p></div>`
    }
  } catch (error) {
    el.innerHTML = `<div><p>Error: ${error.message}</p></div>`
  }
}
