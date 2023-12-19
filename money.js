const d = document,
ls = localStorage

export const setMoney = counter => {
    const $counter = d.querySelector(counter)
    let money = ls.getItem("money")
    if(!money){
        ls.setItem("money", 100)
        money = 100
    }
    else money = parseInt(money)
    $counter.textContent = money
}

export const buyProduct = async (btns, db, money) => {
    const $btns = d.querySelectorAll(btns),
    $money = d.querySelector(money),
    res = await fetch(db),
    products = await res.json()

    $btns.forEach($btn => {
        $btn.addEventListener("click", e => {
            const product = $btn.getAttribute("data-product"),
            price = parseInt(products["food"][product]["price"]),
            userMoney = parseInt(ls.getItem("money"))
            if(price <= userMoney){
                const newMoney = userMoney - price
                let productAmount = parseInt(ls.getItem(product)) || 5

                ls.setItem("money", newMoney)
                $money.textContent = `$${newMoney}`
                ls.setItem(product, (productAmount + 1))

                d.querySelector(".money-counter").textContent = newMoney
                
            }
            else alert("No te alcanza el dinero")
        })
    });
}