import { changeFood, feed, statsConfig } from "./pet.js"

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
        : d.querySelector(".amount").textContent = "X" + ls.getItem("burger")
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
